import { IntSettingDefinition, BoolSettingDefinition } from "factorio:settings";
import { settings } from "constants";

data.extend<BoolSettingDefinition | IntSettingDefinition>([
    {
        type: "int-setting",
        name: settings.startGracePeriod,
        setting_type: "runtime-global",
        default_value: 5,
        minimum_value: 0,
        order: "aa",
    },
    {
        type: "int-setting",
        name: settings.repeatedGracePeriod,
        setting_type: "runtime-global",
        default_value: 0,
        minimum_value: 0,
        order: "ab",
    },
    {
        type: "bool-setting",
        name: settings.starterChest,
        setting_type: "runtime-global",
        default_value: true,
        order: "ba",
    }
])
