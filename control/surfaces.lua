local deepmerge = require("helpers/deepmerge")
local state = require("control/state")

---@param settings MapGenSettings
local function preventAutoplace(settings)
    return deepmerge(settings or {}, {
        property_expression_names = {
            ['entity:warp-console:probability'] = '-inf',
            ['tile:empty-space:probability'] = '-inf',
            ['tile:warp-tile:probability'] = "-inf"
        }
    })
end

local surfaces = {
    nauvis = {
        default = preventAutoplace(prototypes.map_gen_preset["default"].basic_settings)
    }
}

---@param planet string
---@param type string
---@return MapGenSettings
local function getSurface(planet, type)
    return deepmerge(surfaces.nauvis.default, {
        seed = math.random(0, (2 ^ 32) - 1)
    })
end

---@param player LuaPlayer
---@param surface LuaSurface
local function teleportToSurface(player, surface)
    local pos = surface.find_non_colliding_position("character", player.position, 128, 1, true)
    if not pos then
        pos = surface.find_non_colliding_position("character", {0, 1}, 128, 1, true)
        if not pos then
            player.print("warp-teleport.no-position")
            return
        end
    end
    player.teleport(pos, surface)
end

return { getSurface = getSurface, teleportToSurface = teleportToSurface }
