
local red = "automation-science-pack"
local green = "logistic-science-pack"
local blue = "chemical-science-pack"
local black = "military-science-pack"
local purple = "production-science-pack"
local yellow = "utility-science-pack"
local white = "space-science-pack"

---@param packs { red: number | nil, green: number | nil, blue: number | nil, black: number | nil, purple: number | nil, yellow: number | nil, white: number | nil }
function ingredients(packs)
    local result = {}
    if (packs.red) then table.insert(result, { red, packs.red }) end
    if (packs.green) then table.insert(result, { green, packs.green }) end
    if (packs.black) then table.insert(result, { black, packs.black }) end
    if (packs.blue) then table.insert(result, { blue, packs.blue }) end
    if (packs.purple) then table.insert(result, { purple, packs.purple }) end
    if (packs.yellow) then table.insert(result, { yellow, packs.yellow }) end
    if (packs.white) then table.insert(result, { white, packs.white }) end
    return result
end

---@param packs { [1]: string }[]
---@return string[]
function prerequisites(packs)
    local result = {}
    for _, pack in ipairs(packs) do
        table.insert(result, pack[1])
    end
    return result
end

return {
    ingredients = ingredients,
    prerequisites = prerequisites
}
