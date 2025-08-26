local deepmerge = require("helpers/deepmerge")
local tints = require("helpers/tints")

local tutorialGrid = table.deepcopy(data.raw.tile['tutorial-grid'])

data:extend({
    deepmerge(tutorialGrid, {
        tint = tints.tint,
        name = 'warp-tile',
        layer = 99,
        decorative_removal_probability = 1,
        walking_speed_modifier = 1.6,
        map_color = tints.tint,
        minable = {
            mining_time = 0.1,
            result = 'warp-tile'
        },
        autoplace = {
            probability_expression = "-inf",
            default_enabled = false,
        },
        collision_mask = { layers = { ['ground_tile'] = true } },
        check_collision_with_entities = true,
    }),
    {
        type = 'recipe',
        name = 'warp-tile',
        category = 'crafting',
        order_string = "b[concrete]-a[plain]",
        subgroup = 'terrain',
		icons = { { icon = "__warptorio-classic__/graphics/warp-tile.png", tint = tints.tint, icon_size = 64 } },
        ingredients = {
            { type = "item", name = "copper-plate", amount = 100 }
        },
        results = {
            { type = "item", name = 'warp-tile', amount = 1 }
        },
        enabled = true,
        hidden = false,
    },
    {
        type = 'item',
        name = 'warp-tile',
        stack_size = 50,
		icons = { { icon = "__warptorio-classic__/graphics/warp-tile.png", tint = tints.tint, icon_size = 64 } },
        place_as_tile = {
            result = 'warp-tile',
            condition = { layers = { ["ground_tile"] = true } },
            condition_size = 1,
            invert = true
        }
    }
})
