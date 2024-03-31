import { Dictionary, createDict } from "@/utils/Dictionary";
import { Claim, ClaimId } from "../types/Claim";

const mainClaimId = "mainClaim" as ClaimId
const c1 = "1" as ClaimId
const c2 = "2" as ClaimId

export const slightlyComplexArray: Claim[] = [
    { id: mainClaimId, type: "Claim" },
    {
        id: "1" as ClaimId,
        type: "Claim",
        parentId: mainClaimId,
        pro: true,
        affects: "Confidence",
    },
    {
        id: "2" as ClaimId,
        type: "Claim",
        parentId: mainClaimId,
        pro: false,
        affects: "Confidence",
    },
    {
        id: "2_1" as ClaimId,
        type: "Claim",
        parentId: c2,
        pro: true,
        affects: "Confidence",
    },
    {
        id: "2_2" as ClaimId,
        type: "Claim",
        parentId: c2,
        pro: true,
        affects: "Confidence",
    },
    {
        id: "2_3" as ClaimId,
        type: "Claim",
        parentId: c2,
        pro: false,
        affects: "Confidence",
    },

]


export const slightlyComplex = createDict(slightlyComplexArray) as Dictionary<Claim>;