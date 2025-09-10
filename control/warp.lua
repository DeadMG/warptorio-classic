local surface = require("control/surfaces")
local state = require("control/state")
local reactor = require("control/reactor")
local settings = require("control/settings")
local identifiers = require("identifiers")

local function onInit()
    local surface = game.create_surface("warp-zone-" .. state.nextWarpzone(), surface.getSurface("nauvis", "default"))
    surface.request_to_generate_chunks({ 0, 0 })
    surface.force_generate_chunk_requests()

    local tiles = {}

    for x = 0, 3, 1 do
        for y = -4, 2, 1 do
            table.insert(tiles, { name = identifiers.warpTile, position = { x, y } })
        end
    end

    surface.set_tiles(tiles)

    for x = 1, 2, 1 do
        for y = 0, 1, 1 do
            surface.set_hidden_tile({ x, y }, nil)
        end
    end

    for x = 0, 3, 1 do
        for y = -4, -1, 1 do
            surface.set_hidden_tile({ x, y }, nil)
        end
    end

    local console = surface.create_entity({
        name = "warp-console",
        position = { 2, 1 },
        direction = defines.direction.north,
        force = game.forces.player,
    })
    console.destructible = false

    state.setNextWarpzone(surface)
    reactor.onInit(surface)
end

---@param player LuaPlayer
local function canWarpAnywhere(player)
    return player.force.technologies[identifiers.remoteHomeWarp].researched
end

local function canWarpHere(player)
    local surfaces = state.surfaces()

    if player.surface == surfaces.factory then return true end
    if player.surface ~= surfaces.ground then return false end -- Unknown 3rd party surface?

    local tile = player.surface.get_tile(player.position)
    return tile.name == identifiers.warpTile
end

---@param player LuaPlayer
local function isPlayerWarpable(player)
    return canWarpAnywhere(player) or canWarpHere(player)
end

local function warpNext()
    local originSurface = state.surfaces().ground

    for _, player in pairs(game.players) do
        if canWarpHere(player) then
            -- continue
        elseif canWarpAnywhere(player) then
            -- teleport them home
            surface.teleportToSurface(player, originSurface, true)
        else
            game.set_lose_ending_info({ title = {"warp-ending.left-behind"}, message={"warp-ending.left-behind-message"} })
            game.set_game_state({ can_continue = false, game_finished = true, player_won = false })
        end
    end

    local warp_tiles = {}
    for _, tile in ipairs(originSurface.find_tiles_filtered({ name={ identifiers.warpTile } })) do
        table.insert(warp_tiles, tile.position)
    end

    local newSurface = game.create_surface("warp-zone-" .. state.nextWarpzone(), surface.getSurface("nauvis", "default"));

    for _, pos in ipairs(warp_tiles) do
        newSurface.request_to_generate_chunks(pos)
    end

    newSurface.force_generate_chunk_requests()

    originSurface.clone_brush({
        source_positions = warp_tiles,
        destination_surface = newSurface,
        source_offset = {0,0},
        destination_offset = {0,0},
        expand_map = true,
        clone_tiles = true,
        clone_entities = true,
        clone_decoratives = false,
        clear_destination_entities = true,
        clear_destination_decoratives = true
    })

    state.setNextWarpzone(newSurface)

    for _, player in pairs(game.players) do
        if player.surface == originSurface then
            player.teleport(player.position, newSurface, true)
        end
    end

    for _, entity in ipairs(newSurface.find_entities_filtered({ type = 'character' })) do
        if not entity.player then
            entity.destroy()
        end
    end

    game.delete_surface(originSurface)
end

---@param force LuaForce
local function autowarpAfterMinutes(force)
    local technologies = force.technologies
    if technologies[identifiers.reactorReassemblyTechs[1]].researched then return 30 end
    return 20
end

---@param force LuaForce
local function autowarpTimer(force)
    return settings.getWarpzoneGracePeriodTicks(state.currentWarpzone()) + (autowarpAfterMinutes(force) * 60 * 60)
end

---@param force LuaForce
local function timeTillAutowarp(force)
    return autowarpTimer(force) - state.getWarpzoneTicks()
end

local function onTick()
    for _, force in pairs(game.forces) do
        if (timeTillAutowarp(force) <= 0) then warpNext() end
    end
end

return {
    onInit = onInit,
    warpNext = warpNext,
    onTick = onTick,
    timeTillAutowarp = timeTillAutowarp,
    isPlayerWarpable = isPlayerWarpable,
}
