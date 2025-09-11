import { tints, entities } from "constants"
import { ConstantCombinatorPrototype } from "factorio:prototype"

data.extend<ConstantCombinatorPrototype>([
	{
		type: "constant-combinator",
		name: entities.warpConsole,
		collision_box: [[-1, -1], [1, 1]],
		selection_box: [[-1, -1], [1, 1]],
		icons: [
			{ icon: "__space-exploration-graphics__/graphics/icons/spaceship-console-base.png", icon_size: 64 },
			{ icon: "__space-exploration-graphics__/graphics/icons/spaceship-console-mask.png", icon_size: 64, tint: tints.secondary },
			{ icon: "__space-exploration-graphics__/graphics/icons/spaceship-console-white.png", icon_size: 64 },
        ],
		icon_size: 64,
		sprites: {
			sheets: [
				{
					filename: "__space-exploration-graphics__/graphics/entity/spaceship-console/spaceship-console-base.png",
					frames: 1,
					width: 256,
					height: 256,
					scale: 0.25
				},
				{
					filename: "__space-exploration-graphics__/graphics/entity/spaceship-console/spaceship-console-mask.png",
					priority: "high",
					tint: tints.secondary,
					frames: 1,
					width: 256,
					height: 256,
					scale: 0.25,
					draw_as_glow: true,
                    blend_mode: "additive",
				},
				{
					filename: "__space-exploration-graphics__/graphics/entity/spaceship-console/spaceship-console-white.png",
					priority: "high",
					frames: 1,
					width: 256,
					height: 256,
					scale: 0.25,
					blend_mode: "additive",
					draw_as_glow: true,
				},
				{
					filename: "__space-exploration-graphics__/graphics/entity/spaceship-console/spaceship-console-shadow.png",
					priority: "high",
					frames: 1,
					width: 110,
					height: 74,
					scale: 0.25,
					blend_mode: "additive",
					draw_as_shadow: true,
				},
            ]
		},
		hidden: true,
        hidden_in_factoriopedia: true,
		flags: ["not-deconstructable", "not-blueprintable", "hide-alt-info", "player-creation"],
		collision_mask: data.raw["constant-combinator"]["constant-combinator"]!.collision_mask,
		activity_led_light_offsets: [[0,0], [0,0], [0,0], [0,0]],
		circuit_wire_connection_points: [{ wire: {}, shadow: {} }, { wire: {}, shadow: {} }, { wire: {}, shadow: {} }, { wire: {}, shadow: {} }],
		autoplace: {
			probability_expression: "0",
			default_enabled: false,
		},
		is_military_target: true,
	}
]);
