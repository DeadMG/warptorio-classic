local surface = require("control/surfaces")
local state = require("control/state")
local pollution = require("control/pollution")

local function onInit()
    local surface = game.create_surface("warp-zone-" .. state.nextWarpzone(), surface.getSurface("nauvis", "default"));
    surface.request_to_generate_chunks({ 0, 0 })
    surface.force_generate_chunk_requests()

    state.setNextWarpzone(surface)
    pollution.init(surface)
end

local function warpNext()
    local originSurface = state.surfaces().ground

    local warp_tiles = {}
    for _, tile in ipairs(originSurface.find_tiles_filtered({ name={'warp-tile' } })) do
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
            local tile = originSurface.get_tile(player.position)
            if tile.name == "warp-tile" then
                player.teleport(player.position, newSurface, true)
            else
                game.set_lose_ending_info({ title = {"warp-ending.left-behind"}, message={"warp-ending.left-behind-message"} })
                game.set_game_state({ can_continue = false, game_finished = true, player_won = false })
            end
        end
    end

    for _, entity in ipairs(newSurface.find_entities_filtered({ type = 'character' })) do
        if not entity.player then
            entity.destroy()
        end
    end

    game.delete_surface(originSurface)
end

return { onInit = onInit, warpNext = warpNext }
