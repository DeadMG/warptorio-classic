import { entities } from "constants";
import { currentSurfaces } from "control/state";
import { teleportToSurface } from "control/surfaces";
import { warpNext } from "control/warp";
import { LuaPlayer, OnGuiClickEvent } from "factorio:runtime"
import * as gui from "__flib__.gui";

const name = entities.warpConsole;

function parent(player: LuaPlayer) {
    return player.gui.center;
}

export function closeGui(player: LuaPlayer) {
    parent(player)[name]?.destroy();
    player.opened = undefined;
}

const handlers = {
    on_close: (e: OnGuiClickEvent) => {
        closeGui(game.players[e.player_index])
    },

    on_warp: (e: OnGuiClickEvent) => {
        warpNext();
        closeGui(game.players[e.player_index]);
    },

    teleport_to_ground: (e: OnGuiClickEvent) => {
        const player = game.players[e.player_index];
        teleportToSurface(player, currentSurfaces().ground);
        closeGui(player);
    },

    teleport_to_factory: (e: OnGuiClickEvent) => {
        const player = game.players[e.player_index];
        teleportToSurface(player, currentSurfaces().factory);
        closeGui(player);
    },

    teleport_to_logistics: (e: OnGuiClickEvent) => {
        const player = game.players[e.player_index];
        teleportToSurface(player, currentSurfaces().logistics);
        closeGui(player);
    },
}

gui.add_handlers(handlers, null, name)

function createWindow(player: LuaPlayer) {
    const warpControls: gui.ElemDefinition[] = [
        { type: "button", caption: ["warp-panel.teleport-to-ground"], handler: handlers.teleport_to_ground },
        { type: "button", caption: ["warp-panel.teleport-to-factory"], handler: handlers.teleport_to_factory },
        { type: "button", caption: ["warp-panel.teleport-to-logistics"], handler: handlers.teleport_to_logistics }
    ];

    const mainControls: gui.ElemDefinition[] = [
        { type: "flow", direction: "vertical", children: warpControls },
        { type: "empty-widget", style_mods: { minimal_height: 5 } },
        { type: "button", caption: ["warp-panel.warp"], handler: handlers.on_warp }
    ];

    const dialog = gui.add(parent(player),
        { type: "frame", direction: "vertical", name: name, children: [
            { type: "flow", children: [
                { type: "label", style: "frame_title", caption: [`${name}.window-title`], elem_mods: { ignored_by_interaction: true }},
                { type: "empty-widget", style_mods: { horizontally_stretchable: true } },
                { type: "sprite-button", style: "frame_action_button", mouse_button_filter: ["left"], sprite: "utility/close", hovered_sprite: "utility/close_black", handler: handlers.on_close }]},
            { type: "frame", style: "inside_shallow_frame_with_padding", style_mods: { padding: 8 }, children: [
                { type: "flow", direction: "vertical", style_mods: { horizontal_align: "left" }, children: mainControls }
            ]}]});

    return dialog[name];
}

export function openGui(player: LuaPlayer){
    if (parent(player)[name]){
        player.opened = parent(player)[name]
        return;
    }

    player.opened = createWindow(player);
}

function refreshGui(player: LuaPlayer){
    if (!parent(player)[name]) return;
    
    closeGui(player);
    openGui(player);
}

export function onResearchFinished() {
    for (const [_, player] of game.players) {
        refreshGui(player);
    }
}
