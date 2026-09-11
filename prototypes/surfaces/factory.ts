import { NamedNoiseExpression } from "factorio:prototype"
import { tiles, entities, noiseExpressions } from "constants"

data.extend<NamedNoiseExpression>([
    {
        type: "noise-expression",
        name: noiseExpressions.factory.startingTiles,
        expression: "if((x >= 0) & (x <= 3) & (y >= 0) & (y <= 3), 1, 0)"
    },
    {
        type: "noise-expression",
        name: noiseExpressions.factory.emptySpace,
        expression: `${noiseExpressions.factory.startingTiles} == 0`
    },
    {
        type: "noise-expression",
        name: noiseExpressions.factory.startingConsole,
        expression: "x == 2 & y == 2"
    },
]);

const settings = data.raw.planet.nauvis!.map_gen_settings!;

settings.autoplace_controls = {};
settings.autoplace_settings = {
    tile: {
        treat_missing_as_default: false,
        settings: {
            [tiles.emptySpace]: {},
            [tiles.warpTile]: {}
        }
    },
    entity: {
        treat_missing_as_default: false,
        settings: {
            [entities.warpConsole]: {}
        }
    },
    decorative: {
        treat_missing_as_default: false,
        settings: {
        }
    }
};

settings.property_expression_names = {
    [`tile:${tiles.emptySpace}:probability`]: noiseExpressions.factory.emptySpace,
    [`tile:${tiles.warpTile}:probability`]: noiseExpressions.factory.startingTiles,
    [`entity:${entities.warpConsole}:probability`]: noiseExpressions.factory.startingConsole,
};

settings.moisture_climate_control = false;
settings.aux_climate_control = false;

const render_params = data.raw.planet.nauvis!.surface_render_parameters!;
render_params.clouds = undefined;
render_params.draw_sprite_clouds = false;

const surface_props = data.raw.planet.nauvis!.surface_properties!;
surface_props['day-night-cycle'] = 0;
