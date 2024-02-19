import { Dictionary } from "@/utils/Dictionary";
import { Claim, ClaimId } from "./types/Claim";
import { Edge, EdgeId } from "./types/Edge";
import { Id, push } from "./types/Item";
import { getEdgeIdsByToId } from "./getEdgeIdsByToId";
import { sortEdgeIdsLeavesToRoot } from "./sortLeavesToRoot";

/** SCORE TYPES
 * The score ID starts with a prefix for the type of score (TBD)
 * then a dash '-'
 * then usually the id of the edge, if it is the main score then the main claim ID will be used as there is no edge yet
 * generally starts with the edge ID.
 * 
 * Starting from a leaf claim with no edges to it and this no childrent or descendant claims
 * 
 * gc- Gather confidence: the score of the claim with a percent pro and a percent con before any cancelling. If no children then 100% pro 0% con
 * cl- Claim: the score of the claim with a percent pro and a percent con before any cancelling. If no children then 100% pro 0% con
 * s1- Scale to 1 (This ay be options and may happen before or after the canceling) shrinks the size of the score area to be the standard size
 * ca- Cancelled: the score of the claim after the con score cancels the same ammount of pro score
 * sr- Scale the width of the line based on any relevance pros and con on it or it's edge
 * sc- scale down the impact based on the confidence of the claim. 
 */

/**
 * 
 * @param mainId 
 * @param items 
 * @returns 
 */
export function calcScore<I extends Claim | Edge>(mainId: ClaimId, items: Dictionary<I>) {
    const scores: Dictionary<Score> = {};

    /** index for quickly finding edges by  (to) */
    let edgeIdsByToId: {
        [id in Edge['to']]: EdgeId[];
    } = getEdgeIdsByToId(items);

    let edgeIdsSorted = sortEdgeIdsLeavesToRoot(items);




    return scores;
}

export type Score = {
    /** The score ID starts with a prefix for the type of score (TBD)
     * then a dash '-'
     * then usually the id of the edge, if it is the main score then the main claim ID will be used as there is no edge yet
     * generally starts with the edge ID. */
    id: ScoreId,
};

export type ScoreId = Id & { readonly __brand: unique symbol };



