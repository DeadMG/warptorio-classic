import { TechnologyUnit, TechnologyPrototype } from "factorio:prototype"
import { technologies, tints } from "constants"
import { ingredients, prerequisites } from "prototypes/technology/science-packs";

function warpReactorReassembly(subicon: string, name: string, cost: TechnologyUnit, extraPrereqs?: string[]): TechnologyPrototype {
    return {
        type: "technology",
        upgrade: true,
        icons: [
            {
                icon: "__space-exploration-graphics__/graphics/icons/gravimetrics-laboratory.png",
                tint: tints.primary,
                icon_size: 64,
            },
            {
                icon: subicon,
                scale: 2,
                shift: [64, 64],
                icon_size: 64,
            }
        ],
        name: name,
        unit: cost,
        prerequisites: [
            ...(extraPrereqs || []),
            ...prerequisites(cost.ingredients)
        ],
    }
}

const warpReactorReassemblyTechnologies = [
    { subicon: "__base__/graphics/icons/iron-plate.png", cost: { count: 50, time: 5, ingredients: ingredients({ red: 1 }) } }
];

data.extend(warpReactorReassemblyTechnologies.map((item, index) => warpReactorReassembly(item.subicon, technologies.warpReactorReassembly[index], item.cost)));
