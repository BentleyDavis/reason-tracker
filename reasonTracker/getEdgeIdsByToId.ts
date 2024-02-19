import { Dictionary, getValues } from "@/utils/Dictionary";
import { Claim, ClaimId } from "./types/Claim";
import { Edge, EdgeId, isEdge } from "./types/Edge";

export function getEdgeIdsByToId<I extends Claim | Edge>(items: Dictionary<Claim | Edge>) {
    let edgeIdsByToId: Record<EdgeId | ClaimId, EdgeId[]> = {};
    getValues(items).forEach(edge => {
        if (isEdge(edge)) {
            const id = edge.to;
            (edgeIdsByToId[id] = edgeIdsByToId[id] ?? []).push(edge.id);
        }
    });
    return edgeIdsByToId;
}
