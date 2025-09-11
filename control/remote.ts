import { currentWarpzone, getWarpzoneTicks, surfaces } from "control/state";
import { teleportToSurface } from "control/surfaces";
import { isPlayerWarpable, timeTillAutowarp, warpNext } from "control/warp";
import { LocalisedString, LuaPlayer, OnGuiClickEvent } from "factorio:runtime";
import * as gui from "__flib__.gui";
import { technologies } from "constants";
import { getWarpzoneGracePeriodTicks } from "control/settings";

const name = "warp-remote";
const warpTimeHandle = "warp-time";
const controlParent = "control-parent";
const warpButton = "warp-button";
const factoryFloorButton = "warp-factory-floor-button";
const groundFloorButton = "warp-ground-floor-button";

function parent(player: LuaPlayer) {
    return player.gui.left;
}

export function closeGui(player: LuaPlayer) {
    if (parent(player)[name]) {
        parent(player)[name]?.destroy();
    }

    player.opened = undefined;
}

const handlers = {
    on_warp: (e: OnGuiClickEvent) => {
        const player = game.players[e.player_index];
        if (!isPlayerWarpable(player)) {
            player.print(["warp-error.require-home"]);
            return;
        }

        warpNext();
    },

    teleport_to_ground: (e: OnGuiClickEvent) => {
        const player = game.players[e.player_index]
        if (!isPlayerWarpable(player)) {
            player.print(["warp-error.require-home"]);
            return;
        }

        teleportToSurface(player, surfaces().ground);
    },

    teleport_to_factory: (e: OnGuiClickEvent) => {
        const player = game.players[e.player_index]
        if (!isPlayerWarpable(player)) {
            player.print(["warp-error.require-home"]);
            return;
        }

        teleportToSurface(player, surfaces().factory);
    }
}

gui.add_handlers(handlers, null, name);

function renderTime(seconds: number): LocalisedString {
    seconds = math.floor(seconds)

    if (seconds < 60) {
        return ["time-symbol-seconds-short", seconds];
    }

    const minutes = math.floor(seconds / 60);
    if (minutes < 60) {
        return ["",  ["time-symbol-minutes-short", minutes], " ", ["time-symbol-seconds-short", seconds % 60]];
    }

    const hours = math.floor(seconds / 3600);
    return ["",  ["time-symbol-hours-short", hours], " ", ["time-symbol-minutes-short", minutes % 60], " ", ["time-symbol-seconds-short", seconds % 60]];
}

function warpControls(player: LuaPlayer) {
    return [
        { name: warpButton, enabled: player.force.technologies[technologies.remoteWarp].researched },
        { name: groundFloorButton, enabled: player.force.technologies[technologies.remoteFloorWarp].researched },
        { name: factoryFloorButton, enabled: player.force.technologies[technologies.remoteFloorWarp].researched },
    ];
}

function refreshGui(player: LuaPlayer) {
    const root = parent(player)[name];
    if (!root) return;

    const grace = getWarpzoneGracePeriodTicks(currentWarpzone());
    const remainingGrace = math.max(0, grace - getWarpzoneTicks());

    if (remainingGrace == 0) {
        root[warpTimeHandle]!.caption = ["warp-remote.warp-time", renderTime(timeTillAutowarp(player.force) / 60)];
    } else {
        root[warpTimeHandle]!.caption = ["warp-remote.warp-grace", renderTime(remainingGrace / 60)];
    }

    const controls = root[controlParent]!;

    let showParent = false
    for (const control of warpControls(player)) {
        controls[control.name]!.visible = control.enabled;
        showParent = showParent || control.enabled;
    }
    controls.visible = showParent;
}

function createWindow(player: LuaPlayer) {
    gui.add(parent(player),
        { type: "frame", direction: "vertical", name: name, children: [
            { type: "label", style: "frame_title", caption: ["warp-remote.window-title"], elem_mods: { ignored_by_interaction: true } },
            { type: "label", name: warpTimeHandle },
            { type: "flow", name: controlParent, direction: "vertical", children: [
                { type: "button", name: groundFloorButton, caption: ["warp-panel.teleport-to-ground"], handler: handlers.teleport_to_ground },
                { type: "button", name: factoryFloorButton, caption: ["warp-panel.teleport-to-factory"], handler: handlers.teleport_to_factory },
                { type: "button", name: warpButton, caption: ["warp-panel.warp"], handler: handlers.on_warp }
            ]}]});

    refreshGui(player)
    return parent(player)[name];
}

export function openGui(player: LuaPlayer) {
    if (parent(player)[name]) return

    createWindow(player)
}

export function onResearchFinished() {
    for (const [_, player] of game.players) {
        refreshGui(player)
    }
}

export function onTick() {
    if (getWarpzoneTicks() % 60 == 0) {
        for (const [_, player] of game.players) {
            refreshGui(player)            
        }
    }
}
