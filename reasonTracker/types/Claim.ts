import { Id, Item } from "./Item";

export type ClaimId = Id & { readonly __claimId: unique symbol };

export type Affects = 'Relevance' | 'Confidence'

export type ClaimBase = Item<"Claim", ClaimId> & {
    title?: string;
    content?: string;
}

export type Claim = ClaimBase & Partial<ChildClaim>

export type childUtility = {
    parentId: ClaimId;
    pro: boolean;
    affects: Affects
}

export type ChildClaim = ClaimBase & childUtility

export function isClaim(item: any): item is Claim {
    return item?.type === "Claim";
}


export function isChildClaim(item: any): item is ChildClaim {
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
