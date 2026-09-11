import { NamedNoiseExpression } from "factorio:prototype"
import { noiseExpressions } from "constants"

data.extend<NamedNoiseExpression>([
    {
        type: "noise-expression",
        name: noiseExpressions.logistics.startingTiles,
        expression: "if((x >= 0) & (x <= 3) & (y >= 0) & (y <= 3), 1, 0)"
    },
    {
        type: "noise-expression",
        name: noiseExpressions.logistics.emptySpace,
        expression: `${noiseExpressions.logistics.startingTiles} == 0`
    },
    {
        type: "noise-expression",
        name: noiseExpressions.logistics.startingConsole,
        expression: "x == 2 & y == 2"
    },
]);
