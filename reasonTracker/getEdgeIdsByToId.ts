import { Dictionary, getValues } from "@/utils/Dictionary";
import { Claim, ClaimId } from "./types/Claim";
import { ClaimEdge, ClaimEdgeId, isEdge } from "./types/Edge";

export function getEdgeIdsByToId<I extends Claim | ClaimEdge>(items: Dictionary<Claim | ClaimEdge>) {
    let edgeIdsByToId: Record<ClaimEdgeId | ClaimId, ClaimEdgeId[]> = {};
    getValues(items).forEach(edge => {
        if (isEdge(edge)) {
            const id = edge.to;
            (edgeIdsByToId[id] = edgeIdsByToId[id] ?? []).push(edge.id);
        }
    });
    return edgeIdsByToId;
}
