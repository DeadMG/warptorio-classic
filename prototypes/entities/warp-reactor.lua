local tints = require("helpers/tints")

local gravimetric_animation_speed = 0.75

local scale = 0.38

data:extend({
  {
    show_recipe_icon_on_map = false,
    show_recipe_icon = false,
    is_military_target = true,
    type = "assembling-machine",
    name = "warp-reactor",
    icon = "__space-exploration-graphics__/graphics/icons/gravimetrics-laboratory.png",
    icon_size = 64,
    flags = { "placeable-neutral", "placeable-player", "player-creation", "not-deconstructable" },
    max_health = 700,
    collision_box = {{-2, -2}, {2, 2}},
    selection_box = {{-2, -2}, {2, 2}},
    drawing_box = {{-2, -3}, {2, 5}},
    resistances = {
      {
        type = "impact",
        percent = 10
      }
    },
    vehicle_impact_sound = { filename = "__base__/sound/car-metal-impact.ogg", volume = 0.65 },
    collision_mask = data.raw["assembling-machine"]["assembling-machine-1"].collision_mask,
    graphics_set = {
        animation = {
            layers = {
                {
                    filename = "__space-exploration-graphics-4__/graphics/entity/gravimetrics-laboratory/gravimetrics-laboratory.png",
                    priority = "high",
                    width = 3360/10,
                    height = 2304/6,
                    frame_count = 60,
                    line_length = 10,
                    shift = util.by_pixel(0, -11),
                    animation_speed = gravimetric_animation_speed,
                    scale = scale,
                },
                {
                    draw_as_shadow = true,
                    filename = "__space-exploration-graphics-4__/graphics/entity/gravimetrics-laboratory/gravimetrics-laboratory-shadow.png",
                    priority = "high",
                    width = 4480/10,
                    height = 750/3,
                    frame_count = 30,
                    line_length = 10,
                    repeat_count = 2,
                    shift = util.by_pixel(26, 24),
                    animation_speed = gravimetric_animation_speed,
                    scale = scale,
                },
            },
        },
        status_colors = {
            working = {r = 0.0, g = 1.0, b = 0.0, a = 1.0}, -- green
            full_output = {r = 1.0, g = 1.0, b = 0.0, a = 1.0}, -- yellow
            idle = {r = 1.0, g = 0.0, b = 0.0, a = 1.0}, -- red
        },
        default_recipe_tint = {
            primary = tints.counterTint
        },
        working_visualisations = {
            {
                effect = "uranium-glow", -- changes alpha based on energy source light intensity
                light = {intensity = 0.5, size = 8, shift = {0.0, 0.0}, color = {r = 100/255, g = 48/255, b = 1}}
            },
            {
                apply_recipe_tint = "primary",
                animation = {
                    filename = "__space-exploration-graphics-4__/graphics/entity/gravimetrics-laboratory/gravimetrics-laboratory-tint.png",
                    width = 3360/10,
                    height = 2304/6,
                    frame_count = 60,
                    line_length = 10,
                    shift = util.by_pixel(0, -11),
                    animation_speed = gravimetric_animation_speed,
                    blend_mode = "additive",
                    scale = scale,
                }
            },
            {
                apply_recipe_tint = "secondary",
                animation = {
                    filename = "__space-exploration-graphics-4__/graphics/entity/gravimetrics-laboratory/gravimetrics-laboratory-tint-2.png",
                    width = 112,
                    height = 112,
                    frame_count = 1,
                    line_length = 1,
                    shift = util.by_pixel(51, 32),
                    animation_speed = gravimetric_animation_speed,
                    blend_mode = "additive",
                    scale = scale,
                }
            },
            {
                always_draw = true,
                apply_tint = "status",
                animation = {
                    filename = "__space-exploration-graphics-4__/graphics/entity/gravimetrics-laboratory/gravimetrics-laboratory-working.png",
                    width = 24,
                    height = 24,
                    frame_count = 1,
                    line_length = 1,
                    shift = util.by_pixel(57, 34),
                    animation_speed = gravimetric_animation_speed,
                    blend_mode = "additive",
                    scale = scale,
                }
            }
        },
    },
    crafting_categories = {"warp-polluter"},
    crafting_speed = 1,
    energy_source = { type = "void", emissions_per_minute = { pollution = 10800 } },
    energy_usage = "1W",
  },
})
