import { setSurfaceClear, SurfaceClearAction } from "control/state";
import { LuaPlayer, LuaSurface } from "factorio:runtime";

export function createSurfaceFor(planet: string, action: SurfaceClearAction) {
    const surface = createNewSurface(planet);

    surface.map_gen_settings = {
        ...surface.map_gen_settings,
        seed: math.random() * 4294967295
    };
    
    surface.clear();

    setSurfaceClear(surface.index, action);
}

export function createNewSurface(planet: string) {
    return getInternalPlanet(planet).create_surface();
}

function getInternalPlanet(planet: string) {    
    const existing = game.planets[`${planet}-a`].surface;
    if (existing) {
        return game.planets[`${planet}-b`];
    }
    return game.planets[`${planet}-a`];
}

export function teleportToSurface(player: LuaPlayer, surface: LuaSurface, force?: boolean) {
    if (!force && player.surface != surface) {
        const pos = surface.find_non_colliding_position("character", player.position, 128, 1, true)
        if (pos) {
            player.teleport(pos, surface);
            return;
        }
    }

    const pos = surface.find_non_colliding_position("character", [0, 1], 128, 1, true)
    if (pos) {
        player.teleport(pos, surface);
        return;
    }

    player.print("warp-error.no-position");
}
