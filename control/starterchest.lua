local settings = require("control/settings")
local state = require("control/state")

local chestContents = {
    ["stone"] = 20,
    ["coal"] = 20,
    ["iron-plate"] = 20,
    ["copper-plate"] = 20,
    ["electronic-circuit"] = 10,
    ["iron-gear-wheel"] = 10,
    ["wooden-chest"] = 4,
    ["transport-belt"] = 10,
    ["underground-belt"] = 2,
    ["splitter"] = 1,
    ["burner-mining-drill"] = 2,
    ["assembling-machine-1"] = 2,
    ["small-electric-pole"] = 5,
    ["steam-engine"] = 1,
    ["boiler"] = 1,
    ["gun-turret"] = 4,
    ["uranium-rounds-magazine"] = 50,
    ["piercing-rounds-magazine"] = 200,
    ["firearm-magazine"] = 400,
}

local function onInit()
    if not settings.starterChest() then return end

    local ground = state.surfaces().ground

    local starter = ground.create_entity({
        name = "steel-chest",
        position = { x = 0, y = 0 },
        direction = defines.direction.north,
        force = game.forces.player
    })
    local inventory = starter.get_inventory(defines.inventory.chest)
    for item, count in pairs(chestContents) do
        inventory.insert({ name = item, count = count })
    end
end

return { onInit = onInit }