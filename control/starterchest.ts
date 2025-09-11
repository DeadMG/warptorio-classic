import { starterChest } from "control/settings";
import { surfaces } from "control/state";

const chestContents = [
    { name: "stone", count: 20 },
    { name: "coal", count: 20 },
    { name: "iron-plate", count: 20 },
    { name: "copper-plate", count: 20 },
    { name: "electronic-circuit", count: 10 },
    { name: "iron-gear-wheel", count: 10 },
    { name: "wooden-chest", count: 4 },
    { name: "transport-belt", count: 10 },
    { name: "underground-belt", count: 2 },
    { name: "splitter", count: 1 },
    { name: "burner-mining-drill", count: 2 },
    { name: "assembling-machine-1", count: 2 },
    { name: "small-electric-pole", count: 5 },
    { name: "steam-engine", count: 1 },
    { name: "boiler", count: 1 },
    { name: "gun-turret", count: 4 },
    { name: "uranium-rounds-magazine", count: 50 },
    { name: "piercing-rounds-magazine", count: 200 },
    { name: "firearm-magazine", count: 400 }
];

export function onInit() {
    if (!starterChest()) return;

    const ground = surfaces().ground

    const starter = ground.create_entity({
        name: "steel-chest",
        position: { x: 0, y: 0 },
        direction: defines.direction.north,
        force: game.forces.player
    })!;

    const inventory = starter.get_inventory(defines.inventory.chest);

    for (const item of chestContents) {
        inventory?.insert({ name: item.name, count: item.count });
    }
}
