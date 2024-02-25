import { Id, Item } from "./Item";

export type ClaimId = Id & { readonly __claimId: unique symbol };

export type Affects = 'Relevance' | 'Confidence'

export type Claim = Item<"Claim", ClaimId> & {
    parentId?: ClaimId;
    pro?: boolean;
    affects?: Affects
    title?: string;
    content?: string;
}

export type ChildClaim = Claim & { parentId: ClaimId, proParent: boolean, affects: Affects }


export function isClaim(item: any): item is Claim {
    return item?.type === "Claim";
}


export function isChildClaim(item: any): item is Claim & { parentId: ClaimId, proParent: boolean } {
    return item?.parentId !== undefined &&
        item?.pro !== undefined &&
        item?.affects !== undefined;
}

export function isRelevance(item: any): item is Claim & { affects: 'Relevance' } {
    return isChildClaim(item) && item.affects === "Relevance";
}

export function isConfidence(item: any): item is Claim & { affects: 'Relevance' } {
    return isChildClaim(item) && item.affects === "Relevance";
}
