import { NamedNoiseExpression, PlanetPrototype } from "factorio:prototype"
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

for (const key of Object.keys(data.raw.planet)) {
    const planet = data.raw.planet[key]!;

    data.extend<PlanetPrototype>([
        {
            ...planet,
            name: `${planet.name}-a`
        },
        {
            ...planet!,
            name: `${planet.name}-b`
        }
    ]);
}

const nauvis = data.raw.planet.nauvis!;

nauvis.map_gen_settings = {
    ...nauvis.map_gen_settings,
    autoplace_controls: {},
    autoplace_settings: {
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
    },
    property_expression_names: {
        [`tile:${tiles.emptySpace}:probability`]: noiseExpressions.factory.emptySpace,
        [`tile:${tiles.warpTile}:probability`]: noiseExpressions.factory.startingTiles,
        [`entity:${entities.warpConsole}:probability`]: noiseExpressions.factory.startingConsole,
    },
    moisture_climate_control: false,
    aux_climate_control: false,
};

nauvis.surface_render_parameters = {
    ...nauvis.surface_render_parameters,
    clouds: undefined,
    draw_sprite_clouds: undefined
};

nauvis.surface_properties = {
    ...nauvis.surface_properties,
    'day-night-cycle': 0
};
