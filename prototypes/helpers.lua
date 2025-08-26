local tints = require("helpers/tints")

---@param sprite data.Sprite
local function setTintOnSprite(sprite)
    sprite.tint = tints.tint

    if sprite.layers then
        for _, layer in ipairs(sprite.layers) do
            setTintOnSprite(layer)
        end
    end
end

return { setTintOnSprite = setTintOnSprite }