import { ScoreWithParent } from "./calculateConfidence";

export function calculateRelevance(children: ScoreWithParent[]): number {
    const relevanceChildren = children.filter(child => child.affects === "Relevance")

    let relevance = 1;
    for (const child of relevanceChildren) {
        if (child.unitConfidence > 0) { // skip if the confidence is less than zero (not reversable)
            if (child.proMyParent) {
                relevance *= 1 + child.unitConfidence;
            } else {
                relevance *= child.unitConfidence / 2
            }
        }
    }

    if (relevance < 0) relevance = 0; // not reversable so we don't allow negative relevance

    return relevance
}