local deepmerge = require("helpers/deepmerge")
local tint = require("helpers/tint")

local tutorialGrid = table.deepcopy(data.raw.tile['tutorial-grid'])
local nonWarpTileLayer = "non_warp_tile_collision_layer"

data:extend({
    {
        type = "collision-layer",
        name = nonWarpTileLayer
    }
})

for _, tile in pairs(data.raw.tile) do
    if tile.name ~= 'empty-space' then
        tile.collision_mask.layers[nonWarpTileLayer] = true
    end
end

data:extend({
    deepmerge(tutorialGrid, {
        tint = tint,
        name = 'warp-tile',
        layer = 99,
        decorative_removal_probability = 1,
        walking_speed_modifier = 1.6,
        map_color = tint,
        minable = {
            mining_time = 0.1,
            result = 'warp-tile'
        },
        autoplace = {
            probability_expression = "0",
            default_enabled = false,
        },
        collision_mask = { layers = { ['ground_tile'] = true } },
        check_collision_with_entities = true,
        render_layer = "ground",
    }),
    {
        type = 'recipe',
        name = 'warp-tile',
        category = 'crafting',
        order_string = "b[concrete]-a[plain]",
        subgroup = 'terrain',
		icons = { { icon = "__warp-age__/graphics/warp-tile.png", tint = tint, icon_size = 64 } },
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
		icons = { { icon = "__warp-age__/graphics/warp-tile.png", tint = tint, icon_size = 64 } },
        place_as_tile = {
            result = 'warp-tile',
            condition = { layers = { ["water_tile"] = true } },
            condition_size = 1,
            invert = true
        }
    }
})

return { nonWarpTileLayer = nonWarpTileLayer }