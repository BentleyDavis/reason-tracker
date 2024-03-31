import { ChildScore, ScoreWithDisplayData, childContibution, ScoreWithParent } from "./types/Score";

export function calculateConfidence<T extends ChildScore<ID>, ID>(children: T[]):
    ScoreWithDisplayData {

    const confidenceChildren = children.filter(child => child.affects === "Confidence")
    const childrenContibutions: childContibution<ID>[] = [];

    if (confidenceChildren.length < 1) {
        return {
            pctProMeConfidence: 1,
            pctConMeConfidence: 0,
            unitConfidence: 1,
        }
    }

    let [pctProMeConfidence, pctConMeConfidence, unitConfidence, totalChildrenWeight] = [0, 0, 0, 0];

    for (const child of confidenceChildren) {
        totalChildrenWeight += childWeight(child);
    }

    for (const child of confidenceChildren) {
        const flip = child.proMyParent ? 1 : -1; // Flip it if it is a con (not pro parent)
        // TODO: Can't the unitConfidence be calculated by directly using the pctProMeConfidence and pctConMeConfidence? Maybe even in a separate math example like in the display? Or do we need the weights?
        const pctValue = child.unitConfidence * childWeight(child) / totalChildrenWeight * flip;
        unitConfidence += child.unitConfidence * child.pctRelevantToMyParent * pctValue;

        if (pctValue > 0) {
            pctProMeConfidence += pctValue;
        } else {
            pctConMeConfidence -= pctValue;
        }

    }

    return {
        pctProMeConfidence,
        pctConMeConfidence,
        unitConfidence: unitConfidence > 0 ? unitConfidence : 0, // Currently not reversable so we don't allow negative confidence
    }

}

function childWeight(score: ScoreWithParent) {
    return Math.abs(score.unitConfidence) * score.pctRelevantToMyParent
}
