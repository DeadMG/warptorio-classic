local nauvis = require('prototypes/planets/nauvis')
local deepmerge = require("helpers/deepmerge")

data:extend({
    deepmerge(nauvis.original, {
        name = "home"
    })
})
