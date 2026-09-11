import { entities, technologies, tiles } from "constants";
import { currentWarpzone, getWarpzoneTicks, nextWarpzone, setNextWarpzone, currentSurfaces } from "control/state";
import { getSurface, teleportToSurface } from "control/surfaces";
import { LuaForce, LuaPlayer } from "factorio:runtime";
import * as reactor from "control/reactor";
import { getWarpzoneGracePeriodTicks } from "control/settings";

function range(start: number, end: number) {
    const result: number[] = [];
    for (let x = start; x <= end; x++) {
        result.push(x);
    }
    return result;
}

export function onInit() {
    const surface = game.create_surface(`warp-zone-${nextWarpzone()}`, getSurface("nauvis", "default"))
    surface.request_to_generate_chunks([0, 0])
    surface.force_generate_chunk_requests()

    surface.set_tiles(range(0, 3).flatMap(x => range(-4, 2).map(y => ({ name: tiles.warpTile, position: { x, y } }))));

    for (const x of range(1, 2)) {
        for (const y of range(0, 1)) {
            surface.set_hidden_tile({ x, y }, undefined)
        }
    }

    for (const x of range(0, 3)) {
        for (const y of range(-4, -1)) {
            surface.set_hidden_tile({ x, y }, undefined)
        }
    }

    const console = surface.create_entity({
        name: entities.warpConsole,
        position: [2, 1],
        direction: defines.direction.north,
        force: game.forces.player,
    })!;
    console.destructible = false

    setNextWarpzone(surface);
    reactor.onInit(surface);
}

function canWarpAnywhere(player: LuaPlayer) {
    return player.force.technologies[technologies.remoteHomeWarp].researched;
}

function canWarpHere(player: LuaPlayer) {
    if (player.surface == currentSurfaces().factory) return true
    if (player.surface == currentSurfaces().logistics) return true
    if (player.surface != currentSurfaces().ground) return false // Unknown 3rd party surface?

    const tile = player.surface.get_tile(player.position.x, player.position.y);
    return tile.name == tiles.warpTile;
}

export function isPlayerWarpable(player: LuaPlayer) {
    return canWarpAnywhere(player) || canWarpHere(player)
}

export function warpNext() {
    const originSurface = currentSurfaces().ground

    for (const [_, player] of game.players) {
        if (canWarpHere(player)) continue;

        if (canWarpAnywhere(player)) {
            // teleport them home
            teleportToSurface(player, originSurface, true);
            continue;
        } 
        
        game.set_lose_ending_info({ title: ["warp-ending.left-behind"], message: ["warp-ending.left-behind-message"] });
        game.set_game_state({ can_continue: false, game_finished: true, player_won: false });
    }

    const warp_tiles = originSurface.find_tiles_filtered({ name: tiles.warpTile });
    const newSurface = game.create_surface(`warp-zone-${nextWarpzone()}`, getSurface("nauvis", "default"));

    for (const tile of warp_tiles) {
        newSurface.request_to_generate_chunks(tile.position);
    }

    newSurface.force_generate_chunk_requests()

    originSurface.clone_brush({
        source_positions: warp_tiles.map(x => x.position),
        destination_surface: newSurface,
        source_offset: [0,0],
        destination_offset: [0,0],
        expand_map: true,
        clone_tiles: true,
        clone_entities: true,
        clone_decoratives: false,
        clear_destination_entities: true,
        clear_destination_decoratives: true
    });

    setNextWarpzone(newSurface);

    for (const [_, player] of game.players) {
        if (player.surface == originSurface) {
            player.teleport(player.position, newSurface, true);
        }
    }

    for (const entity of newSurface.find_entities_filtered({ type: 'character' })) {
        if (!entity.player) entity.destroy();
    }

    game.delete_surface(originSurface);
}

function autowarpAfterMinutes(force: LuaForce) {
    if (force.technologies[technologies.warpReactorReassembly[0]].researched) return 30;
    return 20;
}

function autowarpTimer(force: LuaForce) {
    return getWarpzoneGracePeriodTicks(currentWarpzone()) + (autowarpAfterMinutes(force) * 60 * 60);
}

export function timeTillAutowarp(force: LuaForce) {
    return autowarpTimer(force) - getWarpzoneTicks();
}

export function onTick() {
    for (const [_, force] of game.forces) {
        if (timeTillAutowarp(force) <= 0) warpNext();
    }
}
