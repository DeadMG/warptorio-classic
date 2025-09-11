export function onInit() {
    const freeplay = remote.interfaces["freeplay"];
    if (freeplay != null) {  // Disable freeplay popup-message
        if (freeplay["set_skip_intro"]) remote.call("freeplay", "set_skip_intro", true);
        if (freeplay["set_disable_crashsite"]) remote.call("freeplay", "set_disable_crashsite", true);
    }
}
