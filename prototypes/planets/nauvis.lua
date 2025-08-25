data:extend({
    {
        type = "noise-expression",
        name = "starting_tiles",
        expression = "(x >= -1) * (x <= 0) * (y >= -1) * (y <= 0)"
    },
    {
        type = "noise-expression",
        name = "map_end",
        expression = "starting_tiles == 0"
    },
    {
        type = "noise-expression",
        name = "starting_console",
        expression = "x == 2 & y == 2"
    },
})

local original = table.deepcopy(data.raw.planet.nauvis)
local settings = data.raw.planet.nauvis.map_gen_settings

settings.autoplace_controls = {}
settings.autoplace_settings = {
    tile = {
        treat_missing_as_default = false,
        settings = {
            ["empty-space"] = {},
            ["warp-tile"] = {}
        }
    },
    entity = {
        treat_missing_as_default = false,
        settings = {
        }
    },
    decorative = {
        treat_missing_as_default = false,
        settings = {
        }
    }
}

if settings.cliff_settings then
    settings.cliff_settings.richness = 0
end

settings.property_expression_names = {
    ['tile:empty-space:probability'] = 'map_end',
    ['tile:warp-tile:probability'] = "starting_tiles",
}
settings.moisture_climate_control = false
settings.aux_climate_control = false

local render_params = data.raw.planet.nauvis.surface_render_parameters
render_params.clouds = nil
render_params.draw_sprite_clouds = false

local surface_props = data.raw.planet.nauvis.surface_properties
surface_props['day-night-cycle'] = 0

return { original = original }