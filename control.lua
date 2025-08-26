local freeplay = require("control/freeplay")
local warp = require("control/warp")
local gui = require("__flib__.gui")
local console = require("control/console")
local pollution = require("control/pollution")
local state = require("control/state")

script.on_init(function()
    state.onInit()

    warp.onInit()

    freeplay.onInit()
end)

script.on_event(defines.events.on_gui_opened, function(event)
    if not (event.entity and event.entity.valid) then return end
    local player = game.players[event.player_index]
    if not player or not player.valid then return end

    if event.entity.name == "warp-console" then
        console.openGui(player)
    else
        console.closeGui(player)
    end
end)

script.on_event(defines.events.on_tick, function()
    pollution.onTick()
end)

--- @param event EventData.on_built_entity
function onCreated(event)
    pollution.onCreated(event)
end

for name in pairs(gui.events) do
    local existingHandler = script.get_event_handler(name)
    script.on_event(name, function(event)
        if existingHandler then
            existingHandler(event)
        end
        gui.dispatch(event)
    end)
end
