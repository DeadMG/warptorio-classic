local panel = require("control/panel")

return panel.createPanel({
    name = "warp-console",
    parent = function(player) return player.gui.center end,
    canClose = true
})