import { Dictionary, getMany, getOne } from "@/utils/Dictionary";
import { Claim, isChildClaim } from "./types/Claim";
import { sortEdgeIdsLeavesToRoot } from "./sortLeavesToRoot";
import { claimChildrenIdsByParentId } from "./claimChildrenIdsByParentId";
import { Id, Item } from "./types/Item";
import { calculateConfidence } from "./calculateConfidence";
import { ChildScore } from "./types/Score";
import { calculateRelevance } from "./calculateRelevance";



export function calculate(claims: Dictionary<Claim>) {

    const childIndex = claimChildrenIdsByParentId(claims);

    // const confidences: Dictionary<ScoreWithDisplayData> = {};
    const scores: Dictionary<ChildScore<Id>> = {};

    // walk up the tree calculating the confidence of each claim
    for (const claimId of sortEdgeIdsLeavesToRoot(claims)) {
        const childrenIds = getOne(claimId, childIndex) || [];
        const claim = claims[claimId] as Claim;
        const childScores = getMany(childrenIds, scores);
        const score = calculateConfidence(childScores);
        const Relevance = calculateRelevance(childScores);
        if (isChildClaim(claim)) {
            scores[claimId] = {
                id: claimId,
                unitConfidence: score.unitConfidence,
                proMyParent: claim.pro,
                pctRelevantToMyParent: Relevance,
                affects: claim.affects
            }
        } else {
            // TODO: how to handle the root item?
        }
    }

    return scores

}


export type Confidence = Item<"Confidence", Id> & {
    confidence: number;
    treetype: "Node";
}


