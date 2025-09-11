import * as constants from "constants";

declare const settings: { 
    global: {
        [constants.settings.repeatedGracePeriod]: { value: number };
        [constants.settings.startGracePeriod]: { value: number };
        [constants.settings.starterChest]: { value: boolean };
    }
};

export function getWarpzoneGracePeriodTicks(warpzone: number) {
    if (warpzone == 1) {
        return settings.global[constants.settings.startGracePeriod].value * 60 * 60;
    }
    return settings.global[constants.settings.repeatedGracePeriod].value * 60 * 60;
}

export function starterChest() {
    return settings.global[constants.settings.starterChest].value;
}
