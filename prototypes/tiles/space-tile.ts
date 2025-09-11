import { tiles } from "constants"
import { TilePrototype, TileEffectDefinition } from "factorio:prototype"

if (data.raw["tile"]["empty-space"]) {
    data.raw["tile"]["empty-space"].default_cover_tile = tiles.warpTile;
} else {
    data.extend<TilePrototype | TileEffectDefinition>([
        {
            type: "tile-effect",
            name: "space",
            shader: "space",
            space: {}
        },
        {
            name: "empty-space",
            type: "tile",
            order: "z[other]-b[empty-space]",
            subgroup: "special-tiles",
            collision_mask:
            {
            layers:
            {
                ground_tile: true,
                water_tile: true,
                empty_space: true,
                resource: true,
                floor: true,
                item: true,
                object: true,
                player: true,
                doodad: true
            },
            },
            layer_group: "zero",
            layer: 0,
            effect: "space",
            effect_color: [0.5, 0.507, 0],
            effect_color_secondary: [0, 68, 25],
            particle_tints:
            {
            primary: [0, 0, 0, 0],
            secondary: [0, 0, 0, 0],
            },
            variants:
            {
            main:
            [
                {
                picture: "__warptorio-classic__/graphics/space-tile.png",
                count: 1,
                size: 1
                }
            ],
            empty_transitions: true
            },
            map_color: [0, 0, 0],
            absorptions_per_second: {},
            autoplace: {
                probability_expression: "-inf",
                default_enabled: false,
            },
            default_cover_tile: tiles.warpTile
        }
    ]);
}
