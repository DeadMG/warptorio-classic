data:extend({
    {
        type = "int-setting",
        name = "warp-starting-grace-period",
        setting_type = "runtime-global",
        default_value = 5,
        minimum_value = 0,
        order = "aa",
    },
    {
        type = "int-setting",
        name = "warp-repeated-grace-period",
        setting_type = "runtime-global",
        default_value = 0,
        minimum_value = 0,
        order = "ab",
    },
    {
        type = "bool-setting",
        name = "warp-starter-chest",
        setting_type = "runtime-global",
        default_value = true,
        order = "ba",
    }
})
