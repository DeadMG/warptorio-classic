import { TechnologyUnit, TechnologyPrototype } from "factorio:prototype"
import { technologies, tints } from "constants"
import { ingredients, prerequisites } from "prototypes/technology/science-packs";

function miningTech(name: string, cost: TechnologyUnit, extraPrereqs?: string[]): TechnologyPrototype {
    return {
        type: "technology",
        upgrade: true,
        icons: [
            {
                icon: "__base__/graphics/technology/steel-axe.png",
                tint: tints.primary,
                icon_size: 256,
            }
        ],
        name: name,
        unit: cost,
        prerequisites: [
            ...(extraPrereqs?.filter(x => x != null) || []),
            ...prerequisites(cost.ingredients)
        ],
        effects: [
            { type: "character-mining-speed", modifier: 1 }
        ]
    };
}

const miningTechs = [
    { cost: { count: 50, time: 5, ingredients: ingredients({ red: 1 }) } },
    { cost: { count: 100, time: 5, ingredients: ingredients({ red: 1 }) } },
    { cost: { count: 100, time: 5, ingredients: ingredients({ red: 1, green: 1 }) } },
    { cost: { count: 150, time: 5, ingredients: ingredients({ red: 2, green: 1 }) } },
    { cost: { count: 200, time: 5, ingredients: ingredients({ red: 3, green: 1 }) } },
];

data.extend(miningTechs.map((item, index) => miningTech(technologies.mining[index], item.cost, [technologies.mining[index - 1]])));
