---@param warpzone number
---@return number
local function getWarpzoneGracePeriodTicks(warpzone)
    if warpzone == 1 then
        return settings.global["warp-starting-grace-period"].value * 60 * 60
    end
    return settings.global["warp-repeated-grace-period"].value * 60 * 60
end

return {
    getWarpzoneGracePeriodTicks = getWarpzoneGracePeriodTicks
}