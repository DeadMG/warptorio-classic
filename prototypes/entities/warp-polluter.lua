local tints = require("helpers/tints")

local polluterRecipe = function(tint, name)
    return {
        type = "recipe",
        name = "warp-polluter-" .. name,
        category = "warp-polluter",
        results = {},
        ingredients = {},
        energy_required = 3600000000,
        hide_from_player_crafting = true,
        hide_from_signal_gui = true,
        hide_from_stats = true,
        hidden_in_factoriopedia = true,
        icons = {
			{ icon = "__space-exploration-graphics__/graphics/icons/spaceship-console-base.png", icon_size = 64 },
			{ icon = "__space-exploration-graphics__/graphics/icons/spaceship-console-mask.png", icon_size = 64, tint = tint },
			{ icon = "__space-exploration-graphics__/graphics/icons/spaceship-console-white.png", icon_size = 64 },
		},
        crafting_machine_tint = {
            primary = tint
        }
    }
end

local recipes = {}
for k, v in ipairs(tints.warpReactorRecipes) do
    table.insert(recipes, polluterRecipe(v, k))
end

data:extend(recipes)

data:extend({
    {
        type = "recipe-category",
        name = "warp-polluter",
        hidden = true,
        hidden_in_factoriopedia = true,
    }
})
