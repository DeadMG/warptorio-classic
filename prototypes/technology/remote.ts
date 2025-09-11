import { TechnologyUnit, TechnologyPrototype } from "factorio:prototype"
import { technologies, tints } from "constants"
import { ingredients, prerequisites } from "prototypes/technology/science-packs";

function remoteTech(name: string, cost: TechnologyUnit, extraPrereqs?: string[]): TechnologyPrototype {
    return {
        type: "technology",
        icon_size: 128,
        icons: [
            {
                icon: "__warptorio-classic__/graphics/remote-control.png",
                tint: tints.primary,
                icon_size: 512,
            }
        ],
        name: name,
        unit: cost,
        prerequisites: [            
            ...(extraPrereqs || []),
            ...prerequisites(cost.ingredients)
        ],
    };
}

data.extend<TechnologyPrototype>([
    remoteTech(technologies.remoteWarp, { count: 50, time: 5, ingredients: ingredients({ red: 5 }) }),
    remoteTech(technologies.remoteFloorWarp, { count: 50, time: 5, ingredients: ingredients({ red: 5, green: 5 }) }, [technologies.remoteWarp]),
    remoteTech(technologies.remoteHomeWarp, { count: 50, time: 5, ingredients: ingredients({ red: 5, green: 5, blue: 5 }) }, [technologies.remoteFloorWarp])
])
