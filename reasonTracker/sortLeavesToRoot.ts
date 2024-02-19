import { Dictionary, getValues } from "@/utils/Dictionary"
import { Edge, EdgeId, isEdge } from "./types/Edge"
import { Claim } from "./types/Claim"

const toposort = require('toposort')

/** returns a list of EdgeIds ordered from leaves to the root */
export function sortEdgeIdsLeavesToRoot(items: Dictionary<Edge | Claim>) {
    const edges = getValues(items).filter(isEdge)
    return toposort(
        Object.values(edges).map(c => [c.to, c.from])
    ).reverse() as EdgeId[]
}