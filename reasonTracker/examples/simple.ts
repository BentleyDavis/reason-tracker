import { Dictionary, createDict } from "@/utils/Dictionary";
import { Claim, ClaimId } from "../types/Claim";

const mainClaimId = "mainClaim" as ClaimId

export const simpleArray: Claim[] = [
    { id: mainClaimId, type: "Claim" },
    {
        id: "pro1" as ClaimId,
        type: "Claim",
        parentId: mainClaimId,
        pro: true,
        affects: "Confidence",
    },
    {
        id: "con1" as ClaimId,
        type: "Claim",
        parentId: mainClaimId,
        pro: false,
        affects: "Confidence",
    },
]


export const simple = createDict(simpleArray) as Dictionary<Claim>;