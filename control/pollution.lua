local state = require("control/state")
local settings = require("control/settings")
local reactor = require("control/reactor")

-- This should produce medium biters after ~15 minutes
-- and big biters after ~40 minutes
---@param ticks number
local function getPollution(ticks)
    return (3 * 1.000011^(ticks))
end

local function onTick()
    local ticks = state.getWarpzoneTicks()
    local grace = settings.getWarpzoneGracePeriodTicks(state.currentWarpzone())

    if ticks < grace then return end
    if ticks == grace then
        reactor.engageReactor(state.getWarpReactor())
    end

    local pollutingTicks = ticks - grace
    local ground = state.surfaces().ground

    ground.pollute({ -1, -1 }, getPollution(pollutingTicks), "warp-reactor")

    local minutes = pollutingTicks/3600

    local biter_wave_start = 5
    local biter_wave_max = 10 + (minutes * 2.5)
    local biter_wave_min = 7

    if (minutes > biter_wave_start) then
        if (math.random() <= 0.01) then
            local biters = biter_wave_min + (math.random() * (biter_wave_max - biter_wave_min))
            ground.set_multi_command({ command = { type = defines.command.attack_area, destination={0,0}, radius=12800 }, unit_count = biters })
        end
    end
end

return { onTick = onTick }
