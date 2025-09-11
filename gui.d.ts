/** @noResolution */

declare module "__flib__.gui" {
    import { EventData, LocalisedString, LuaGuiElement, OnGuiClickEvent } from "factorio:runtime";

    type FlowDirection = "horizontal" | "vertical";

    interface ElementMods {
        ignored_by_interaction?: boolean;
    }

    interface StyleMods {
        minimal_height?: number;
        horizontally_stretchable?: boolean;
        padding?: number;
        horizontal_align?: "left";
    }

    interface SpriteButtonDefinition {
        type: "sprite-button";
        sprite: string;
        handler: { (event: OnGuiClickEvent): void };

        style?: string;
        hovered_sprite?: string;
        mouse_button_filter?: ["left"];
    }

    interface FrameDefinition {
        type: "frame";
        children: ElemDefinition[];

        style?: string;
        direction?: FlowDirection;
        name?: string;
        style_mods?: StyleMods;
    }

    interface LabelDefinition {
        type: "label";

        name?: string;
        caption?: LocalisedString;
        style?: string;
        elem_mods?: ElementMods;
    }

    interface FlowDefinition {
        type: "flow";
        children: ElemDefinition[];

        direction?: FlowDirection;
        name?: string;
        style_mods?: StyleMods;
    }

    interface ButtonDefinition {
        type: "button";
        caption: LocalisedString;
        handler: { (event: OnGuiClickEvent): void };

        name?: string;
    }

    interface EmptyWidgetDefinition {
        type: "empty-widget";

        style_mods?: StyleMods;
    }

    type ElemDefinition = FrameDefinition | LabelDefinition | FlowDefinition | ButtonDefinition | EmptyWidgetDefinition | SpriteButtonDefinition;

    const events: { [key: string]: boolean };
    const dispatch: { (event: EventData): void };
    const add_handlers: { (handlers: {}, test: null, prefix?: string): void };
    const add: { (element: LuaGuiElement, ...children: ElemDefinition[]): { [key: string]: LuaGuiElement } };
}
