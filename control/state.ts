import { surfaces } from "constants";
import { LuaEntity, LuaSurface, OnObjectDestroyedEvent } from "factorio:runtime";

declare const storage: {
    next_warp_zone: number;
    warp_zone_start_tick: number;
    current_surface: LuaSurface;
    reactor: LuaEntity;
    reactor_destruction: number;
};

export function setNextWarpzone(surface: LuaSurface) {
    storage.next_warp_zone = storage.next_warp_zone + 1;
    storage.warp_zone_start_tick = game.tick;
    storage.current_surface = surface;
}

export function nextWarpzone() {
    return storage.next_warp_zone;
}

export function currentWarpzone() {
    return nextWarpzone() - 1;
}

export function getWarpzoneTicks() {
    return game.tick - storage.warp_zone_start_tick;
}

export function currentSurfaces() {
    return {
        factory: game.surfaces.nauvis,
        logistics: game.surfaces[surfaces.logistics],
        ground: storage.current_surface
    };
}

export function onInit() {
    storage.next_warp_zone = 1;
    storage.warp_zone_start_tick = 600;
}

export function setCurrentReactor(reactor: LuaEntity) {
    storage.reactor_destruction = script.register_on_object_destroyed(reactor)[0];
    storage.reactor = reactor;
}

export function getWarpReactor() {
    return storage.reactor;
}

export function isCurrentReactorDestroyed(event: OnObjectDestroyedEvent) {
    return event.registration_number == storage.reactor_destruction;
}
