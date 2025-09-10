local deepmerge = require("helpers/deepmerge")
local sciencePacks = require("helpers/science-packs")
local identifiers = require("identifiers")
local tints = require("helpers/tints")

---@param subicon string
---@param name string
---@param cost data.TechnologyUnit
---@param extraPrereqs string[] | nil
local warpReactorReassembly = function(subicon, name, cost, extraPrereqs)
    local prerequisites = extraPrereqs or {}

    for _, prereq in ipairs(sciencePacks.prerequisites(cost.ingredients)) do
        table.insert(prerequisites, prereq)
    end

    return {
        type = "technology",
        upgrade = true,
        icons = {
            {
                icon = "__space-exploration-graphics__/graphics/icons/gravimetrics-laboratory.png",
                tint = tints.tint,
                priority = "low",
                icon_mipmaps = 4,
                icon_size = 64,
            },
            {
                icon = subicon,
                scale = 2,
                shift = { 64, 64 },
                priority = "high",
                icon_mipmaps = 4,
                icon_size = 64,
            }
        },
        name = name,
        unit = cost,
        prerequisites = prerequisites,
    }
end

data:extend({
    warpReactorReassembly("__base__/graphics/icons/iron-plate.png", identifiers.reactorReassemblyTechs[1], { count = 50, time = 5, ingredients = sciencePacks.ingredients({ red = 1 }) })
})
