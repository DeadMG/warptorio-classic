---@param surface LuaSurface
local function setNextWarpzone(surface)
    storage.next_warp_zone = storage.next_warp_zone + 1
    storage.start_tick = game.tick
    storage.current_surface = surface;
end

local function nextWarpzone()
    return storage.next_warp_zone
end

local function currentWarpzone()
    return nextWarpzone() - 1
end

local function getWarpzoneTicks()
    return game.tick - storage.start_tick
end

local function surfaces()
    return {
        factory = game.surfaces.nauvis,
        ground = storage.current_surface
    }
end

local function nextWarpzoneSeed()
    return storage.generator()
end

local function onInit()
    storage.next_warp_zone = 1
    storage.start_tick = 0
    storage.generator = game.create_random_generator()
end

return { surfaces = surfaces, getWarpzoneTicks = getWarpzoneTicks, setNextWarpzone = setNextWarpzone, onInit = onInit, currentWarpzone = currentWarpzone, nextWarpzone = nextWarpzone, nextWarpzoneSeed = nextWarpzoneSeed }
