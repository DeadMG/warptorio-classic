local helpers = require('helpers')

data:extend({
	{
		type = "constant-combinator",
		name = "warp-tether",
		collision_box = {{-0.5, -0.5}, {0.5, 0.5}},
		selection_box = {{-0.5, -0.5}, {0.5, 0.5}},
		icons = { { icon = "__space-exploration-graphics-5/graphics/entity/space-elevator/space-elevator-left.png", tint = helpers.tint } },
		icon_size = 64,
		sprites = {
			sheet = {
				filename = "__space-exploration-graphics-5/graphics/entity/space-elevator/space-elevator-left.png",
				tint = helpers.tint,
				frames = 1,
				width = 64,
				height = 64,
				scale = 0.5
			}
		},
        flags = { "not-deconstructable", "player-creation", "placeable-player" },
		collision_mask = data.raw["constant-combinator"]["constant-combinator"].collision_mask,
		activity_led_light_offsets = { {0,0}, {0,0}, {0,0}, {0,0} },
		circuit_wire_connection_points = { { wire = {}, shadow = {} }, { wire = {}, shadow = {} }, { wire = {}, shadow = {} }, { wire = {}, shadow = {} } },
	}
})
