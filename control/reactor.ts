import { entities, warpReactorRecipes } from "constants"
import { LuaEntity, LuaSurface, OnEntityClonedEvent, OnObjectDestroyedEvent } from "factorio:runtime"
import { getWarpzoneGracePeriodTicks } from "control/settings";
import { currentWarpzone, isCurrentReactorDestroyed, setCurrentReactor } from "control/state";

export function engageReactor(reactor: LuaEntity) {
    reactor.set_recipe(warpReactorRecipes[0].name);
}

export function setStartingRecipe(reactor: LuaEntity) {
    if (getWarpzoneGracePeriodTicks(currentWarpzone()) != 0) {
        reactor.set_recipe();
        return;
    }

    engageReactor(reactor);
}

export function onInit(surface: LuaSurface) {
    const reactor = surface.create_entity({
        name: entities.warpReactor,
        position: { x: 2, y: -2 },
        direction: defines.direction.north,
        force: game.forces.player
    })!;

    setCurrentReactor(reactor);
    setStartingRecipe(reactor);
}

export function onCloned(event: OnEntityClonedEvent) {
    setCurrentReactor(event.destination);
    setStartingRecipe(event.destination);
}

export function onDestroyed(event: OnObjectDestroyedEvent) {
    if (!isCurrentReactorDestroyed(event)) return;

    game.set_lose_ending_info({ title: ["warp-ending.reactor-destroyed"], message: ["warp-ending.reactor-destroyed-message"] });
    game.set_game_state({ can_continue: false, game_finished: true, player_won: false })
}
