import { entities, noiseExpressions, surfaces, tiles } from "constants"

export function onInit() {
    const surface = game.create_surface(surfaces.logistics, {
        seed: math.random(),
        autoplace_controls: {},
        autoplace_settings: {
            tile: {
                treat_missing_as_default: false,
                settings: {
                    [tiles.emptySpace]: {} as any,
                    [tiles.warpTile]: {} as any
                }
            },
            entity: {
                treat_missing_as_default: false,
                settings: {
                    [entities.warpConsole]: {} as any
                }
            },
            decorative: {
                treat_missing_as_default: false,
                settings: {
                }
            }
        },
        property_expression_names: {
            [`tile:${tiles.emptySpace}:probability`]: noiseExpressions.logistics.emptySpace,
            [`tile:${tiles.warpTile}:probability`]: noiseExpressions.logistics.startingTiles,
            [`entity:${entities.warpConsole}:probability`]: noiseExpressions.logistics.startingConsole,
        }
    } as any);

    surface.request_to_generate_chunks([0, 0]);
    surface.force_generate_chunk_requests();

    surface.always_day = true;
    surface.show_clouds = false;
}
