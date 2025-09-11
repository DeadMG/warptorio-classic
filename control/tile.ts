import { tiles } from "constants"
import { TileID } from "factorio:prototype"
import { LuaPlayer, LuaSurface, LuaTilePrototype, OldTileAndPosition } from "factorio:runtime"

export function getTileLimit(player: LuaPlayer, surface: LuaSurface) {
    return 100
}

function givePlayerItem(player: LuaPlayer, surface: LuaSurface, item: TileID, count: number) {
    if (player.cursor_stack && player.cursor_stack.count == 0) {
        player.cursor_stack.set_stack({ name: item, count: count });
        return;
    } 

    if (player.cursor_stack && player.cursor_stack.name == item) {
        player.cursor_stack.set_stack({ name: item, count: count + player.cursor_stack.count });
        return;
    } 

    const inventory = player.get_inventory(defines.inventory.character_main)
    if (inventory) {
        inventory.insert({ name: item, count: count });
        return;
    } 
    
    surface.spill_item_stack({ position: player.position, stack: { name: item, count: count }});
}

export function onPlayerBuiltTile(player: LuaPlayer, surface: LuaSurface, tile: LuaTilePrototype, old_tiles: OldTileAndPosition[]) {
    if (tile.name != tiles.warpTile) return;

    const totalCount = surface.count_tiles_filtered({ name: tile.name });
    const limit = getTileLimit(player, surface);

    if (totalCount <= limit) return;
    
    const remove = totalCount - limit;
    surface.set_tiles(old_tiles.slice(0, remove).map(t => ({ name: t.old_tile.name, position: t.position })));
    givePlayerItem(player, surface, tiles.warpTile, remove);
    player.create_local_flying_text({ create_at_cursor: true, text: ['warp-error.tile-limit-exceeded'] });
}

