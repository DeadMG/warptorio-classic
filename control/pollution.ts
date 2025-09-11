import { entities } from "constants";
import { engageReactor } from "control/reactor";
import { getWarpzoneGracePeriodTicks } from "control/settings"
import { currentWarpzone, getWarpReactor, getWarpzoneTicks, surfaces } from "control/state"

// This should produce medium biters after ~15 minutes
// and big biters after ~40 minutes
function getPollution(ticks: number) {
    return 3 * Math.pow(1.000011, ticks)
}

export function onTick() {
    const ticks = getWarpzoneTicks();
    const grace = getWarpzoneGracePeriodTicks(currentWarpzone());

    if (ticks < grace) return;

    if (ticks == grace) {
        engageReactor(getWarpReactor());
    }

    const pollutingTicks = ticks - grace
    const ground = surfaces().ground

    ground.pollute([-1, -1], getPollution(pollutingTicks), entities.warpReactor);

    const minutes = pollutingTicks/3600;

    const biter_wave_start = 5;
    const biter_wave_max = 10 + (minutes * 2.5);
    const biter_wave_min = 7;

    if (minutes > biter_wave_start) {
        if (math.random() <= 0.02) {
            const biters = (biter_wave_min + (math.random() * (biter_wave_max - biter_wave_min))) / 2
            ground.set_multi_command({ command: { type: defines.command.attack_area, destination: [0,0], radius: 12800 }, unit_count: biters });
        }
    }
}
