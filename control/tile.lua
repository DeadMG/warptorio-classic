local identifiers = require("identifiers")

---@param player LuaPlayer
---@param surface LuaSurface
---@param tiles OldTileAndPosition[]
local function onPlayerMinedTile(player, surface, tiles)
    for _, tile in ipairs(tiles) do
        if tile.old_tile.name == 'warp-tile' then
            local x = (tile.position.x or tile.position[0]) + 0.5
            local y = (tile.position.y or tile.position[1]) + 0.5

            local entities = surface.find_entities_filtered({ position = { x, y } })

            for _, entity in ipairs(entities) do
                if entity.name == 'warp-reactor' or entity.name == 'warp-console' then
                    surface.set_tiles({ { name = 'warp-tile', position = { x, y } } })
                    local inventory = player.get_inventory(defines.inventory.character_main)
                    if inventory then
                        inventory.remove({ name = "warp-tile" , count = 1 })
                    end
                    player.create_local_flying_text({ create_at_cursor = true, text = { 'warp-messages.cant-remove-tile' } })
                end
            end
        end
    end
end

---@param player LuaPlayer
---@param surface LuaSurface
---@return number
local function getTileLimit(player, surface)
    return 100
end

---@param player LuaPlayer
---@param surface LuaSurface
---@param old_tiles OldTileAndPosition[]
---@param tile LuaTilePrototype
local function onPlayerBuiltTile(player, surface, tile, old_tiles)
    if tile.name == 'warp-tile' then
        local totalCount = surface.count_tiles_filtered({ name = tile.name })
        local limit = getTileLimit(player, surface)
        if totalCount > limit then
            local remove = totalCount - limit

            local tiles = {}
            for i = 1, remove, 1 do
                if old_tiles[i] then
                    table.insert(tiles, { name = old_tiles[i].old_tile.name, position = old_tiles[i].position })
                end
            end

            surface.set_tiles(tiles)

            if player.cursor_stack.count == 0 then
                player.cursor_stack.set_stack({ name = identifiers.warpTile, count = remove })
            else
                if player.cursor_stack.name == identifiers.warpTile then
                    player.cursor_stack.set_stack({ name = identifiers.warpTile, count = remove + player.cursor_stack.count })
                else
                    local inventory = player.get_inventory(defines.inventory.character_main)
                    if inventory then
                        inventory.insert({ name = tile.name, count = remove })
                    else
                        surface.spill_item_stack({ position = player.position, stack = { name = identifiers.warpTile, count = remove }})
                    end
                end
            end

            player.create_local_flying_text({ create_at_cursor = true, text = { 'warp-error.tile-limit-exceeded' } })
        end
    end
end

return { onPlayerMinedTile = onPlayerMinedTile, onPlayerBuiltTile = onPlayerBuiltTile, getTileLimit = getTileLimit }
