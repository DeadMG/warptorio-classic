local deepmerge = require("helpers/deepmerge")
local tints = require("helpers/tints")
local identifiers = require("identifiers")

local tutorialGrid = table.deepcopy(data.raw.tile['tutorial-grid'])

data:extend({
    deepmerge(tutorialGrid, {
        tint = tints.tint,
        name = identifiers.warpTile,
        layer = 99,
        decorative_removal_probability = 1,
        walking_speed_modifier = 1.6,
        map_color = tints.tint,
        minable = {
            mining_time = 0.1,
            result = identifiers.warpTile
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
        name = identifiers.warpTile,
        category = 'crafting',
        order_string = "b[concrete]-a[plain]",
        subgroup = 'terrain',
		icons = { { icon = "__warptorio-classic__/graphics/warp-tile.png", tint = tints.tint, icon_size = 64 } },
        ingredients = {
            { type = "item", name = "copper-plate", amount = 50 },
            { type = "item", name = "stone-brick", amount = 25 }
        },
        results = {
            { type = "item", name = identifiers.warpTile, amount = 1 }
        },
        enabled = true,
        hidden = false,
    },
    {
        type = 'item',
        name = identifiers.warpTile,
        stack_size = 50,
		icons = { { icon = "__warptorio-classic__/graphics/warp-tile.png", tint = tints.tint, icon_size = 64 } },
        place_as_tile = {
            result = identifiers.warpTile,
            condition = { layers = { ["ground_tile"] = true } },
            condition_size = 1,
            invert = true
        }
    }
})
