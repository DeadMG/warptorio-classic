local state = require("control/state")

-- This should produce medium biters after ~15 minutes
-- and big biters after ~40 minutes

---@param ticks number
local function getPollution(ticks)
    return (3 * 1.000011^(ticks)) - 3
end

local function onTick()
    local ticks = state.getWarpzoneTicks()
    local ground = state.surfaces().ground

    ground.pollute({ -1, -1 }, getPollution(ticks), "warp-reactor")
end

return { onTick = onTick }
