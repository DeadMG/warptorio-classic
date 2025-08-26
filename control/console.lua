local gui = require("__flib__/gui")
local surface = require("control/surfaces")
local state = require("control/state")
local warp = require("control/warp")

local windowName = "warp-console-controls"

---@param player LuaPlayer
local function rootGui(player)
    return player.gui.center
end

---@param player LuaPlayer
local function closeGui(player)
    if rootGui(player)[windowName] then
        rootGui(player)[windowName].destroy()
    end
end

local handlers = {
    ---@param e EventData.on_gui_click
    on_close = function (e)
        closeGui(game.players[e.player_index])
    end,

    ---@param e EventData.on_gui_click
    on_warp = function(e)
        warp.warpNext()
        closeGui(game.players[e.player_index])
    end,

    ---@param e EventData.on_gui_click
    teleport_to_ground = function(e)
        surface.teleportToSurface(game.players[e.player_index], state.surfaces().ground)
        closeGui(game.players[e.player_index])
    end,

    ---@param e EventData.on_gui_click
    teleport_to_factory = function(e)
        surface.teleportToSurface(game.players[e.player_index], state.surfaces().factory)
        closeGui(game.players[e.player_index])
    end
}

gui.add_handlers(handlers)

---@param player LuaPlayer
local function createWindow(player)
    local warpControls = {
         {type = "button", caption = { "warp-console.teleport-to-ground" }, handler=handlers.teleport_to_ground },
         {type = "button", caption = { "warp-console.teleport-to-factory" }, handler=handlers.teleport_to_factory }
    }

    local mainControls = {
        {type="flow", direction="vertical", children = warpControls },
        {type="empty-widget", style_mods = { minimal_height = 5 } },
        {type="button", caption={"warp-console.warp"}, handler=handlers.on_warp }
    }

    local dialog = gui.add(rootGui(player), {
        {type="frame", direction="vertical", save_as="main_window", name=windowName, children={
            -- Title Bar
            {type="flow", save_as="titlebar.flow", children={
                {type="label", style="frame_title", caption={"warp-console.window-title"}, elem_mods={ignored_by_interaction=true}},
                {type="empty-widget", style_mods = {horizontally_stretchable = true } },
                {type="sprite-button", style="frame_action_button", mouse_button_filter={"left"}, sprite="utility/close", hovered_sprite="utility/close_black", handler=handlers.on_close }}},
            -- Main body                
            {type="frame", style="inside_shallow_frame_with_padding", style_mods={padding=8}, children={
                {type="flow", direction="vertical", style_mods={horizontal_align="left"}, children=mainControls}}}
            }}})

    return dialog.main_window
end

---@param player LuaPlayer
local function openGui(player)
    if rootGui(player)[windowName] then
        player.opened = rootGui(player)[windowName]
        return
    end
    player.opened = createWindow(player)
end

---@param player LuaPlayer
local function refreshGui(player)
    if not rootGui(player)[windowName] then return end
    closeGui(player)
    openGui(player)
end

local function onResearchFinished()
    for _, player in pairs(game.players) do
        refreshGui(player)
    end
end

return { openGui = openGui, closeGui = closeGui, onResearchFinished = onResearchFinished }
