local sciencePacks = require("helpers/science-packs")
local tints = require("helpers/tints")
local identifiers = require("identifiers")

---@param name string
---@param cost data.TechnologyUnit
---@param extraPrereqs string[] | nil
---@return data.TechnologyPrototype
local function remoteTech(name, cost, extraPrereqs)
    local prerequisites = extraPrereqs or {}

    for _, prereq in ipairs(sciencePacks.prerequisites(cost.ingredients)) do
        table.insert(prerequisites, prereq)
    end

    return {
        type="technology",
        icon_size=128,
        icons={
            {
                icon = "__warptorio-classic__/graphics/remote-control.png",
                tint = tints.tint,
                priority = "low",
                icon_mipmaps = 4,
                icon_size = 512,
            }
        },
        name = name,
        unit = cost,
        prerequisites = prerequisites,
    }
end

data:extend({
    remoteTech(identifiers.remoteWarp, { count = 50, time = 5, ingredients = sciencePacks.ingredients({ red = 5 }) }),
    remoteTech(identifiers.remoteFloorWarp, { count = 50, time = 5, ingredients = sciencePacks.ingredients({ red = 5, green = 5 }) }, { identifiers.remoteWarp }),
    remoteTech(identifiers.remoteHomeWarp, { count = 50, time = 5, ingredients = sciencePacks.ingredients({ red = 5, green = 5, blue = 5 }) }, { identifiers.remoteFloorWarp })
})
