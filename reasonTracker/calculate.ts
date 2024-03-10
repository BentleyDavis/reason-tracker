import { Dictionary } from "@/utils/Dictionary";
import { Claim } from "./types/Claim";
import { sortEdgeIdsLeavesToRoot } from "./sortLeavesToRoot";
import { claimChildrenIdsByParentId } from "./claimChildrenIdsByParentId";
import { Id, Item, push } from "./types/Item";



export function calculate(claims: Dictionary<Claim>) {

    const childIndex = claimChildrenIdsByParentId(claims);

    const nodes: Dictionary<Confidence> = {};

    // walk up the tree calculating the confidence of each claim
    sortEdgeIdsLeavesToRoot(claims).forEach(claimId => {
        const childrenIds = childIndex[claimId];
        let newConfidence: Confidence = {
            type: "Confidence",
            id: "c-" + claimId as Id,
            confidence: 1,
            treetype: "Node",
        }

        // if (childrenIds) {
        //     newConfidence = {
        //         type: "Confidence",
        //         id: claimId,
        //         confidence: 1,
        //     }
        // } 
    });
}


export type Confidence = Item<"Confidence", Id> & {
    confidence: number;
    treetype: "Node";
}

