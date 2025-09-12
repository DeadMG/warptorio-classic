import { NamedNoiseExpression } from "factorio:prototype"
import { tiles, entities } from "constants"

const factoryPrefix = "factory";

const factory = {
    startingTiles: `${factoryPrefix}-starting-tiles`,
    emptySpace: `${factoryPrefix}-empty-space`,
    startingConsole: `${factoryPrefix}-starting-console`
};

data.extend<NamedNoiseExpression>([
    {
        type: "noise-expression",
        name: factory.startingTiles,
        expression: "if((x >= 0) & (x <= 3) & (y >= 0) & (y <= 3), 1, 0)"
    },
    {
        type: "noise-expression",
        name: factory.emptySpace,
        expression: `${factory.startingTiles} == 0`
    },
    {
        type: "noise-expression",
        name: factory.startingConsole,
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
    [`tile:${tiles.emptySpace}:probability`]: factory.emptySpace,
    [`tile:${tiles.warpTile}:probability`]: factory.startingTiles,
    [`entity:${entities.warpConsole}:probability`]: factory.startingConsole,
};

settings.moisture_climate_control = false;
settings.aux_climate_control = false;

const render_params = data.raw.planet.nauvis!.surface_render_parameters!;
render_params.clouds = undefined;
render_params.draw_sprite_clouds = false;

const surface_props = data.raw.planet.nauvis!.surface_properties!;
surface_props['day-night-cycle'] = 0;
