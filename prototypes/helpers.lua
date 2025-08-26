local tint = require("helpers/tint")

---@param sprite data.Sprite
local function setTintOnSprite(sprite)
    sprite.tint = tint

    if sprite.layers then
        for _, layer in ipairs(sprite.layers) do
            setTintOnSprite(layer)
        end
    end
end

return { setTintOnSprite = setTintOnSprite }