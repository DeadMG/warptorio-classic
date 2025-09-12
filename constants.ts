export const tiles = {
    warpTile: 'warp-tile',
    emptySpace: 'empty-space',
} as const;

export const technologies = {
    remoteWarp: "warp-remote-warp",
    remoteFloorWarp: "warp-remote-floor",
    remoteHomeWarp: "warp-remote-home",

    warpReactorReassembly: [
        'warp-reactor-reassembly1'
    ],

    mining: [
        'warp-mining1',
        'warp-mining2',
        'warp-mining3',
        'warp-mining4',
        'warp-mining5',
    ],
} as const;

export const entities = {
    warpConsole: "warp-console",
    warpReactor: "warp-reactor",
} as const;

export const craftingCategories = {
    warpReactor: entities.warpReactor,
} as const;

export const tints = {
    primary: { r: 0.6, g: 0.6, b: 0.8, a: 1 },
    secondary: { r: 1, g: 0.702, b: 0.278, a: 1 }
} as const;

export const warpReactorRecipes = [
    { name: "warp-reactor-recipe1", tint: { r: 1, g: 0.2, b: 0.2, a: 1 } },
    { name: "warp-reactor-recipe2", tint: tints.primary }
] as const;

export const settings = {
    startGracePeriod: 'warp-starting-grace-period',
    repeatedGracePeriod: 'warp-repeated-grace-period',
    starterChest: 'warp-starter-chest'
} as const;