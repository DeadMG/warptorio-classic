import * as gui from "__flib__.gui";
import * as freeplay from "control/freeplay";
import * as state from "control/state";
import * as warp from "control/warp";
import * as remote from "control/remote";
import * as console from "control/console";
import * as reactor from "control/reactor";
import * as pollution from "control/pollution";
import * as tile from "control/tile";
import { entities } from "constants";
import * as logistics from "control/logistics"

script.on_init(() => { 
    freeplay.onInit();
    state.onInit();

    logistics.onInit();
    warp.onInit();
});

script.on_event(defines.events.on_player_created, event => {
    remote.openGui(game.players[event.player_index]);
});

script.on_event(defines.events.on_gui_opened, event => {
    if (event.entity?.valid != true) return;

    const player = game.players[event.player_index];
    if (player?.valid != true) return;

    if (event.entity.name == entities.warpConsole) {
        console.openGui(player);
    }
    
    if (event.entity.name == entities.warpReactor) {
        player.opened = undefined;
    }
});

script.on_event(defines.events.on_gui_closed, event => {
    const player = game.players[event.player_index];
    if (player?.valid != true) return;

    if (event.element?.valid == true) {
        console.closeGui(player);
    }
});

script.on_event(defines.events.on_entity_cloned, event => {
    if (event.destination.name == entities.warpReactor) {
        reactor.onCloned(event);
    }
});

script.on_event(defines.events.on_object_destroyed, event => {
    reactor.onDestroyed(event);
});

script.on_event(defines.events.on_tick, () => {
    warp.onTick();
    pollution.onTick();
    remote.onTick();
});

script.on_event(defines.events.on_research_finished, () => {
    remote.onResearchFinished();
});

script.on_event(defines.events.on_player_built_tile, event => {
    tile.onPlayerBuiltTile(game.players[event.player_index], game.surfaces[event.surface_index], event.tile, event.tiles);
});

script.on_event(defines.events.on_surface_cleared, event => {
    const action = state.surfaceOnClearAction(event.surface_index);
    if (action == state.SurfaceClearAction.InitStartingSurface) {
        warp.initStartingSurface(game.get_surface(event.surface_index)!);
    }
    if (action == state.SurfaceClearAction.ContinueWarpTeleport) {
        warp.continueWarpTeleport(game.get_surface(event.surface_index)!);
    }
});

for (const name in gui.events) {
    const existingHandler = script.get_event_handler(name);

    script.on_event(name, event => {
        existingHandler?.(event);
        
        if (event.element?.valid != true) return;

        gui.dispatch(event);
    });
}
