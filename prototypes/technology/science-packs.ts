import { ResearchIngredient, TechnologyPrototype } from "factorio:prototype"

const red = "automation-science-pack";
const green = "logistic-science-pack";
const blue = "chemical-science-pack";
const black = "military-science-pack";
const purple = "production-science-pack";
const yellow = "utility-science-pack";
const white = "space-science-pack";

interface Packs {
    red?: number;
    green?: number;
    blue?: number;
    black?: number;
    purple?: number;
    yellow?: number;
    white?: number;
}

export function ingredients(packs: Packs): ResearchIngredient[] {
    const result: ResearchIngredient[] = [];
    if (packs.red) result.push([red, packs.red]);
    if (packs.green) result.push([green, packs.green]);
    if (packs.black) result.push([blue, packs.black]);
    if (packs.blue) result.push([black, packs.blue]);
    if (packs.purple) result.push([purple, packs.purple]);
    if (packs.yellow) result.push([yellow, packs.yellow]);
    if (packs.white) result.push([white, packs.white]);
    return result;
}

export function prerequisites(packs: readonly ResearchIngredient[]) {
    return packs.map(x => x[0]);
}
