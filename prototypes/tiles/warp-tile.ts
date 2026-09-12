import { tints, tiles } from "constants"
import { TilePrototype, RecipePrototype, ItemPrototype } from "factorio:prototype"

data.extend<TilePrototype | RecipePrototype | ItemPrototype>([
    {
        ...(data.raw.tile['tutorial-grid'] as TilePrototype),
        tint: tints.primary,
        name: tiles.warpTile,
        layer: 99,
        decorative_removal_probability: 1,
        walking_speed_modifier: 1.6,
        map_color: tints.primary,
        minable: {
            mining_time: 0.1,
            result: tiles.warpTile
        },
        autoplace: {
            probability_expression: "-inf",
            default_enabled: false,
        },
        collision_mask: { layers: { ['ground_tile']: true } },
        check_collision_with_entities: true,
        is_foundation: true,
    },
    {
        type: 'recipe',
        name: tiles.warpTile,
        categories: ['crafting'],
        order: "b[concrete]-a[plain]",
        subgroup: 'terrain',
		icons: [{ icon: "__warp-age__/graphics/warp-tile.png", tint: tints.primary, icon_size: 64 }],
        ingredients: [
            { type: "item", name: "copper-plate", amount: 50 },
            { type: "item", name: "stone-brick", amount: 25 }
        ],
        results: [
            { type: "item", name: tiles.warpTile, amount: 1 }
        ],
        enabled: true,
        hidden: false,
    },
    {
        type: 'item',
        name: tiles.warpTile,
        stack_size: 50,
		icons: [{ icon: "__warp-age__/graphics/warp-tile.png", tint: tints.primary, icon_size: 64 }],
        place_as_tile: {
            result: tiles.warpTile,
            condition: { layers: { ["ground_tile"]: true } },
            condition_size: 1,
            invert: true
        }
    }
]);
