local istable = require("istable")

---@generic T
---@param s T
---@param t any
---@return T
local function deepmerge(s,t)
    for k,v in pairs(t) do
        if (istable(v) and s[k] and istable(s[k])) then
            deepmerge(s[k],v)
        else
            s[k]=v
        end
    end

    return s
end

return deepmerge