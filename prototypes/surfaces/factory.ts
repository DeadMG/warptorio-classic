import { NamedNoiseExpression } from "factorio:prototype"
import { tiles, entities } from "constants"

data.extend<NamedNoiseExpression>([
    {
        type: "noise-expression",
        name: "starting_tiles",
        expression: "if((x >= 0) & (x <= 3) & (y >= 0) & (y <= 3), 1, 0)"
    },
    {
        type: "noise-expression",
        name: "map_end",
        expression: "starting_tiles == 0"
    },
    {
        type: "noise-expression",
        name: "starting_console",
        expression: "x == 2 & y == 2"
    },
]);

const settings = data.raw.planet.nauvis!.map_gen_settings!;

settings.autoplace_controls = {};
settings.autoplace_settings = {
    tile: {
        treat_missing_as_default: false,
        settings: {
            ["empty-space"]: {},
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
    ['tile:empty-space:probability']: 'map_end',
    [`tile:${tiles.warpTile}:probability`]: "starting_tiles",
    [`entity:${entities.warpConsole}:probability`]: 'starting_console',
};

settings.moisture_climate_control = false;
settings.aux_climate_control = false;

const render_params = data.raw.planet.nauvis!.surface_render_parameters!;
render_params.clouds = undefined;
render_params.draw_sprite_clouds = false;

const surface_props = data.raw.planet.nauvis!.surface_properties!;
surface_props['day-night-cycle'] = 0;
