import { Dictionary } from "@/utils/Dictionary";
import { Claim, ClaimId } from "../types/Claim";
import { Edge, EdgeId } from "../types/Edge";


export const simple: Dictionary<Claim | Edge> = {
    "mainClaim": { id: "mainClaim" as ClaimId, type: "Claim", },
    "pro1": { id: "pro1" as ClaimId, type: "Claim", },
    "con1": { id: "con1" as ClaimId, type: "Claim", },
    "pro1Edge": {
        id: "pro1Edge" as EdgeId, type: "Edge",
        from: "pro1" as ClaimId,
        to: "mainClaim" as ClaimId,
        pro: true,
        affects: "Relevance"
    },
    "con1Edge": {
        id: "con1Edge" as EdgeId, type: "Edge",
        from: "con1" as ClaimId,
        to: "mainClaim" as ClaimId,
        pro: false,
        affects: "Relevance"
    }
}