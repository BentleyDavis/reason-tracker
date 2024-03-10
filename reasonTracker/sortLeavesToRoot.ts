import { Dictionary, getValues } from "@/utils/Dictionary"
import { Claim, ClaimId, isChildClaim } from "./types/Claim"

const toposort = require('toposort')

/** returns a list of claimIds ordered from leaves to the root */
export function sortEdgeIdsLeavesToRoot(claims: Dictionary<Claim>) {
    return toposort(
        getValues(claims)
            .filter(c => isChildClaim(c))
            .map(i => [i.id, i.parentId])
    ) as ClaimId[]
}