local gui = require("__flib__/gui")
local surfaces = require("control/surfaces")
local state = require("control/state")
local warp = require("control/warp")

---@class Props
---@field parent fun(player: LuaPlayer): LuaGuiElement
---@field canClose boolean
---@field name string

---@param props Props
local function createPanel(props)
    ---@param player LuaPlayer
    local function closeGui(player)
        if props.parent(player)[props.name] then
            props.parent(player)[props.name].destroy()
        end
        player.opened = nil
    end

    local handlers = {
        ---@param e EventData.on_gui_click
        on_close = function (e)
            closeGui(game.players[e.player_index])
        end,

        ---@param e EventData.on_gui_click
        on_warp = function(e)
            warp.warpNext()
            if props.canClose then closeGui(game.players[e.player_index]) end
        end,

        ---@param e EventData.on_gui_click
        teleport_to_ground = function(e)
            surfaces.teleportToSurface(game.players[e.player_index], state.surfaces().ground)
            if props.canClose then closeGui(game.players[e.player_index]) end
        end,

        ---@param e EventData.on_gui_click
        teleport_to_factory = function(e)
            surfaces.teleportToSurface(game.players[e.player_index], state.surfaces().factory)
            if props.canClose then closeGui(game.players[e.player_index]) end
        end
    }

    gui.add_handlers(handlers, nil, props.name)

    ---@param player LuaPlayer
    local function createWindow(player)
        local warpControls = {
            {type = "button", caption = { "warp-panel.teleport-to-ground" }, handler=handlers.teleport_to_ground },
            {type = "button", caption = { "warp-panel.teleport-to-factory" }, handler=handlers.teleport_to_factory }
        }

        local mainControls = {
            {type="flow", direction="vertical", children = warpControls },
            {type="empty-widget", style_mods = { minimal_height = 5 } },
            {type="button", caption={"warp-panel.warp"}, handler=handlers.on_warp }
        }

        local dialog = gui.add(props.parent(player),
            {type="frame", direction="vertical", name=props.name, children={
                -- Title Bar
                {type="flow", children={
                    {type="label", style="frame_title", caption={ props.name .. ".window-title" }, elem_mods={ignored_by_interaction=true}},
                    {type="empty-widget", style_mods = {horizontally_stretchable = true } },
                    {type="sprite-button", style="frame_action_button", visible=props.canClose, mouse_button_filter={"left"}, sprite="utility/close", hovered_sprite="utility/close_black", handler=handlers.on_close }}},
                -- Main body                
                {type="frame", style="inside_shallow_frame_with_padding", style_mods={padding=8}, children={
                    {type="flow", direction="vertical", style_mods={horizontal_align="left"}, children=mainControls}}}
                }})

        return dialog[props.name]
    end

    ---@param player LuaPlayer
    local function openGui(player)
        if props.parent(player)[props.name] then
            if props.canClose then player.opened = props.parent(player)[props.name] end
            return
        end

        local window = createWindow(player)
        if props.canClose then
            player.opened = window
        end
    end

    ---@param player LuaPlayer
    local function refreshGui(player)
        if not props.parent(player)[props.name] then return end
        closeGui(player)
        openGui(player)
    end

    local function onResearchFinished()
        for _, player in pairs(game.players) do
            refreshGui(player)
        end
    end

    return { openGui = openGui, closeGui = closeGui, onResearchFinished = onResearchFinished }
end

return { createPanel = createPanel }