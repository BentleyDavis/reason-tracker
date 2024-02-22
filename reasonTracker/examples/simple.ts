import { Dictionary } from "@/utils/Dictionary";
import { Claim, ClaimId } from "../types/Claim";
import { ClaimEdge, ClaimEdgeId } from "../types/Edge";


export const simple: Dictionary<Claim | ClaimEdge> = {
    "mainClaim": { id: "mainClaim" as ClaimId, type: "Claim", },
    "pro1": { id: "pro1" as ClaimId, type: "Claim", },
    "con1": { id: "con1" as ClaimId, type: "Claim", },
    "pro1Edge": {
        id: "pro1Edge" as ClaimEdgeId, type: "ClaimEdge",
        from: "pro1" as ClaimId,
        to: "mainClaim" as ClaimId,
        pro: true,
        affects: "Relevance"
    },
    "con1Edge": {
        id: "con1Edge" as ClaimEdgeId, type: "ClaimEdge",
        from: "con1" as ClaimId,
        to: "mainClaim" as ClaimId,
        pro: false,
        affects: "Relevance"
    }
}