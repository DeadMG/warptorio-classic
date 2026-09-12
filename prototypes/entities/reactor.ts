import { craftingCategories, entities, technologies, tints, warpReactorRecipes } from "constants"
import { Color } from "factorio:prototype";
import { AssemblingMachinePrototype, RecipePrototype, RecipeCategory } from "factorio:prototype"
import * as util from "util"

const gravimetric_animation_speed = 0.75;
const scale = 0.38;

data.extend<AssemblingMachinePrototype>([
    {
        show_recipe_icon_on_map: false,
        show_recipe_icon: false,
        is_military_target: true,
        type: "assembling-machine",
        name: entities.warpReactor,
        icon: "__space-exploration-graphics__/graphics/icons/gravimetrics-laboratory.png",
        icon_size: 64,
        flags: ["placeable-neutral", "placeable-player", "player-creation", "not-deconstructable"],
        max_health: 5000,
        collision_box: [[-2, -2], [2, 2]],
        selection_box: [[-2, -2], [2, 2]],
        resistances: [
            {
                type: "physical",
                percent: 30,
                decrease: 5
            }
        ],
        collision_mask: data.raw["assembling-machine"]["assembling-machine-1"]!.collision_mask,
        graphics_set: {
            animation: {
                layers: [
                    {
                        filename: "__space-exploration-graphics-4__/graphics/entity/gravimetrics-laboratory/gravimetrics-laboratory.png",
                        priority: "high",
                        width: 3360/10,
                        height: 2304/6,
                        frame_count: 60,
                        line_length: 10,
                        shift: util.by_pixel(0, -11),
                        animation_speed: gravimetric_animation_speed,
                        scale: scale,
                    },
                    {
                        draw_as_shadow: true,
                        filename: "__space-exploration-graphics-4__/graphics/entity/gravimetrics-laboratory/gravimetrics-laboratory-shadow.png",
                        priority: "high",
                        width: 4480/10,
                        height: 750/3,
                        frame_count: 30,
                        line_length: 10,
                        repeat_count: 2,
                        shift: util.by_pixel(26, 24),
                        animation_speed: gravimetric_animation_speed,
                        scale: scale,
                    },
                ],
            },
            status_colors: {
                working: {r: 0.0, g: 1.0, b: 0.0, a: 1.0}, // green
                full_output: {r: 1.0, g: 1.0, b: 0.0, a: 1.0}, // yellow
                idle: {r: 1.0, g: 0.0, b: 0.0, a: 1.0}, // red
            },
            default_recipe_tint: {
                primary: tints.primary
            },
            working_visualisations: [
                {
                    effect: "uranium-glow", // changes alpha based on energy source light intensity
                    light: { intensity: 0.5, size: 8, shift: [0.0, 0.0], color: { r: 100/255, g: 48/255, b: 1 }}
                },
                {
                    apply_recipe_tint: "primary",
                    animation: {
                        filename: "__space-exploration-graphics-4__/graphics/entity/gravimetrics-laboratory/gravimetrics-laboratory-tint.png",
                        width: 3360/10,
                        height: 2304/6,
                        frame_count: 60,
                        line_length: 10,
                        shift: util.by_pixel(0, -11),
                        animation_speed: gravimetric_animation_speed,
                        blend_mode: "additive",
                        scale: scale,
                    }
                },
                {
                    apply_recipe_tint: "secondary",
                    animation: {
                        filename: "__space-exploration-graphics-4__/graphics/entity/gravimetrics-laboratory/gravimetrics-laboratory-tint-2.png",
                        width: 112,
                        height: 112,
                        frame_count: 1,
                        line_length: 1,
                        shift: util.by_pixel(51, 32),
                        animation_speed: gravimetric_animation_speed,
                        blend_mode: "additive",
                        scale: scale,
                    }
                },
                {
                    always_draw: true,
                    apply_tint: "status",
                    animation: {
                        filename: "__space-exploration-graphics-4__/graphics/entity/gravimetrics-laboratory/gravimetrics-laboratory-working.png",
                        width: 24,
                        height: 24,
                        frame_count: 1,
                        line_length: 1,
                        shift: util.by_pixel(57, 34),
                        animation_speed: gravimetric_animation_speed,
                        blend_mode: "additive",
                        scale: scale,
                    }
                }
            ],
        },
        crafting_categories: [craftingCategories.warpReactor],
        crafting_speed: 1,
        energy_source: { type: "void", emissions_per_minute: { pollution: 1 } },
        energy_usage: "1W",
    },
])

function polluterRecipe(tint: Color, name: string): RecipePrototype {
    return {
        type: "recipe",
        name: name,
        categories: [craftingCategories.warpReactor],
        results: [],
        ingredients: [],
        energy_required: 3600000000,
        hide_from_player_crafting: true,
        hide_from_signal_gui: true,
        hide_from_stats: true,
        hidden_in_factoriopedia: true,
        icons: [
			{ icon: "__space-exploration-graphics__/graphics/icons/spaceship-console-base.png", icon_size: 64 },
			{ icon: "__space-exploration-graphics__/graphics/icons/spaceship-console-mask.png", icon_size: 64, tint: tint },
			{ icon: "__space-exploration-graphics__/graphics/icons/spaceship-console-white.png", icon_size: 64 },
        ],
        crafting_machine_tint: {
            primary: tint
        }
    };
}



data.extend<RecipePrototype>(warpReactorRecipes.map(v => polluterRecipe(v.tint, v.name)));
data.extend<RecipeCategory>([
    {
        type: "recipe-category",
        name: craftingCategories.warpReactor,
        hidden: true,
        hidden_in_factoriopedia: true,
    }
]);
