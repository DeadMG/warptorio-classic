import { LuaPlayer, LuaSurface, MapGenSettings, PropertyExpressionNames } from "factorio:runtime";
import { tiles, entities } from "constants"

function preventAutoplace(settings: MapGenSettings | undefined): MapGenSettings {
    const propertyNames: PropertyExpressionNames = {
        ...(settings?.property_expression_names ?? {}),
        [`entity:${entities.warpConsole}:probability`]: '-inf',
        [`tile:${tiles.emptySpace}:probability`]: '-inf',
        [`tile:${tiles.warpTile}:probability`]: "-inf"
    };

    return {
        ...(settings! ?? {}),
        property_expression_names: propertyNames
    };
}

const surfaces = {
    nauvis: {
        default: preventAutoplace(prototypes.map_gen_preset["default"].basic_settings)
    }
};

export function getSurface(planet: string, type: string): MapGenSettings {
    return {
        ...surfaces.nauvis.default,
        seed: math.random(0, (2 ^ 32) - 1)
    };
}

export function teleportToSurface(player: LuaPlayer, surface: LuaSurface, force?: boolean) {
    if (!force && player.surface != surface) {
        const pos = surface.find_non_colliding_position("character", player.position, 128, 1, true)
        if (pos) {
            player.teleport(pos, surface)
            return
        }
    }

    const pos = surface.find_non_colliding_position("character", [0, 1], 128, 1, true)
    if (pos) {
        player.teleport(pos, surface)
        return
    }

    player.print("warp-error.no-position")
}
