import { TechnologyUnit, TechnologyPrototype } from "factorio:prototype"
import { technologies, tints } from "constants"
import { ingredients, prerequisites } from "prototypes/technology/science-packs";

function remoteTech(name: string, cost: TechnologyUnit, extraPrereqs?: string[]): TechnologyPrototype {
    return {
        type: "technology",
        icon_size: 128,
        icons: [
            {
                icon: "__warp-age__/graphics/remote-control.png",
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
    remoteTech(technologies.remoteWarp, { count: 50, time: 5, ingredients: ingredients({ red: 1 }) }),
    remoteTech(technologies.remoteFloorWarp, { count: 50, time: 5, ingredients: ingredients({ red: 1, green: 1 }) }, [technologies.remoteWarp]),
    remoteTech(technologies.remoteHomeWarp, { count: 50, time: 5, ingredients: ingredients({ red: 1, green: 1, blue: 1 }) }, [technologies.remoteFloorWarp])
]);
