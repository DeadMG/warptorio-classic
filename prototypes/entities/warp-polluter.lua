data:extend({
    { 
        type = "recipe-category",
        name = "warp-polluter",
        hidden = true,
        hidden_in_factoriopedia = true
    },
    {
        type = "assembling-machine",
        name = "warp-polluter",
        result_inventory_size = 1,
        source_inventory_size = 1,
        energy_usage = "1W",
        crafting_speed = 1,
        crafting_categories = { "warp-polluter" },
        energy_source = { type = "void", emissions_per_minute = { pollution = 10800 } },
        hidden = true,
        hidden_in_factoriopedia = true,
        selection_box = {{-0.001, -0.001}, {0.001, 0.001}},
        collision_mask = { layers = {} },
        flags = { "player-creation", "not-rotatable", "placeable-off-grid", "not-on-map", "not-deconstructable", "not-blueprintable", "hide-alt-info", "not-selectable-in-game", "not-upgradable" }
    },
    {
        type = "recipe",
        name = "warp-polluter",
        category = "warp-polluter",
        results = {},
        ingredients = {},
        energy_required = 3600000000,
        hide_from_player_crafting = true,
        hide_from_signal_gui = true,
        hide_from_stats = true,
        icons = {
			{ icon = "__space-exploration-graphics__/graphics/icons/spaceship-console-base.png", icon_size = 64 },
			{ icon = "__space-exploration-graphics__/graphics/icons/spaceship-console-mask.png", icon_size = 64, tint = consoleTint },
			{ icon = "__space-exploration-graphics__/graphics/icons/spaceship-console-white.png", icon_size = 64 },
		}
    }
})
