import { Dictionary, getValues } from "@/utils/Dictionary";
import { Claim, ClaimId, isChildClaim } from "./types/Claim";

export function claimChildrenIdsByParentId<I extends Claim>(items: Dictionary<I>) {
    let dict = {} as Record<ClaimId, ClaimId[]>;
    getValues(items).forEach(claim => {
        if (isChildClaim(claim)) {
            const id = claim.parentId;
            (dict[id] = dict[id] ?? []).push(claim.id);
        }
    });
    return dict;
}
