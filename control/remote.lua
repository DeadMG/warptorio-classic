local gui = require("__flib__/gui")
local surfaces = require("control/surfaces")
local state = require("control/state")
local warp = require("control/warp")
local settings = require("control/settings")
local identifiers = require("identifiers")

local name = "warp-remote"
local warpTimeHandle = "warp-time"
local controlParent = "control-parent"
local warpButton = "warp-button"
local factoryFloorButton = "warp-factory-floor-button"
local groundFloorButton = "warp-ground-floor-button"

local function parent(player)
    return player.gui.left 
end

---@param player LuaPlayer
local function closeGui(player)
    if parent(player)[name] then
        parent(player)[name].destroy()
    end
    player.opened = nil
end

local handlers = {
    ---@param e EventData.on_gui_click
    on_warp = function(e)
        local player = game.players[e.player_index]
        if not warp.isPlayerWarpable(player) then
            player.print({ "warp-error.require-home "})
            return
        end
        warp.warpNext()
    end,

    ---@param e EventData.on_gui_click
    teleport_to_ground = function(e)
        local player = game.players[e.player_index]
        if not warp.isPlayerWarpable(player) then
            player.print({ "warp-error.require-home "})
            return
        end
        surfaces.teleportToSurface(game.players[e.player_index], state.surfaces().ground)
    end,

    ---@param e EventData.on_gui_click
    teleport_to_factory = function(e)
        local player = game.players[e.player_index]
        if not warp.isPlayerWarpable(player) then
            player.print({ "warp-error.require-home "})
            return
        end
        surfaces.teleportToSurface(game.players[e.player_index], state.surfaces().factory)
    end
}

gui.add_handlers(handlers, nil, name)

local function renderTime(seconds)
    seconds = math.floor(seconds)

    if seconds < 60 then
        return {"time-symbol-seconds-short", seconds }
    end

    local minutes = math.floor(seconds / 60)
    if minutes < 60 then
        return {"",  {"time-symbol-minutes-short", minutes }, " ", {"time-symbol-seconds-short", seconds % 60 } }
    end

    local hours = math.floor(seconds / 3600)
    return {"",  {"time-symbol-hours-short", hours }, " ", {"time-symbol-minutes-short", minutes % 60 }, " ", {"time-symbol-seconds-short", seconds % 60 } }
end

---@param player LuaPlayer
local function warpControls(player)
    return {
        [warpButton] = player.force.technologies[identifiers.remoteWarp].researched,
        [groundFloorButton] = player.force.technologies[identifiers.remoteFloorWarp].researched,
        [factoryFloorButton] = player.force.technologies[identifiers.remoteFloorWarp].researched
    }
end

---@param player LuaPlayer
local function refreshGui(player)
    local root = parent(player)[name]
    if not root then return end

    local grace = settings.getWarpzoneGracePeriodTicks(state.currentWarpzone())
    local remainingGrace = math.max(0, grace - state.getWarpzoneTicks())
    if remainingGrace == 0 then
        root[warpTimeHandle].caption = {"warp-remote.warp-time", renderTime(warp.timeTillAutowarp() / 60) }
    else
        root[warpTimeHandle].caption = {"warp-remote.warp-grace", renderTime(remainingGrace / 60) }
    end

    local controls = warpControls(player)
    local controlParent = root[controlParent]

    local showParent = false
    for k, v in pairs(controls) do
        controlParent[k].visible = v
        showParent = showParent or v
    end
    controlParent.visible = showParent
end

---@param player LuaPlayer
local function createWindow(player)
    gui.add(parent(player),
        { type = "frame", direction = "vertical", name = name, children = {
            -- Title Bar
            { type = "label", style = "frame_title", caption = { "warp-remote.window-title" }, elem_mods = { ignored_by_interaction = true }},
            -- Main body
            { type = "label", name = warpTimeHandle, caption = nil },
            { type = "flow", name = controlParent, direction = "vertical", children = {
                { type = "button", name = groundFloorButton, caption = { "warp-panel.teleport-to-ground" }, handler = handlers.teleport_to_ground },
                { type = "button", name = factoryFloorButton, caption = { "warp-panel.teleport-to-factory" }, handler = handlers.teleport_to_factory },
                { type = "button", name = warpButton, caption = { "warp-panel.warp" }, handler = handlers.on_warp }
            }}}})

    refreshGui(player)
    return parent(player)[name]
end

---@param player LuaPlayer
local function openGui(player)
    if parent(player)[name] then
        return
    end

    createWindow(player)
end

local function onResearchFinished()
    for _, player in pairs(game.players) do
        refreshGui(player)
    end
end

local function onTick()
    if state.getWarpzoneTicks() % 60 == 0 then
        for _, player in pairs(game.players) do
            refreshGui(player)
        end
    end
end

return { openGui = openGui, closeGui = closeGui, onResearchFinished = onResearchFinished, onTick = onTick }
