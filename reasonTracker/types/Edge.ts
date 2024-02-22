import { Id } from "./Item";
import { ClaimId } from './Claim'

export type ClaimEdge = {
    id: ClaimEdgeId;
    type: "ClaimEdge";
    from: ClaimId;
    to: ClaimEdgeId | ClaimId;
    pro: boolean;
    affects: Affects
}

export type ClaimEdgeId = Id & { readonly __brand: unique symbol };

export type Affects = 'Relevance' | 'Confidence'

export const isEdge = (obj: any): obj is ClaimEdge => {
    return obj && obj.type === "Edge";
};