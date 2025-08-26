local state = require("control/state")

local function onInit(surface)
    local reactor = surface.create_entity({
        name = "warp-reactor",
        position = { x = 2, y = -2 },
        direction = defines.direction.north,
        force = game.forces.player,
        recipe = "warp-polluter-1"
    })
    state.registerReactorDestroyed(reactor)
end

---@param event EventData.on_entity_cloned
local function onCloned(event)
    state.registerReactorDestroyed(event.destination)
end

---@param event EventData.on_object_destroyed
local function onDestroyed(event)
    if not state.isReactorDestroyed(event) then return end
    game.set_lose_ending_info({ title = {"warp-ending.reactor-destroyed"}, message={"warp-ending.reactor-destroyed-message"} })
    game.set_game_state({ can_continue = false, game_finished = true, player_won = false })
end

return { onInit = onInit, onCloned = onCloned, onDestroyed = onDestroyed }