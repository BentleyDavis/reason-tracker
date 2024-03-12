

export interface Score {
    /**
     * The calculated confidence of the claim from 1 to -1 but currently does not go below 0.
     *  1.0 likely true or assumed true
     *  0.5 probably true
     *  0.0 unknown
     * -0.5 probably false ** currently not allowed
     * -1.0 likely false ** currently not allowed
     */
    unitConfidence: number;
}

export interface HasId<T> {
    id: T;
}

export interface ScoreWithDisplayData extends Score {
    pctProMeConfidence: number
    pctConMeConfidence: number
}

export interface ScoreWithParent extends Score {
    proMyParent: boolean
    pctRelevantToMyParent: number
    affects: "Confidence" | "Relevance"
}

export interface childContibution<ID> extends HasId<ID> {
    pctValue: number;
}

export type childScore<ID> = ScoreWithParent & HasId<ID>;

export function calculateConfidence<T extends childScore<ID>, ID>(children: T[]): {
    score: ScoreWithDisplayData
    childrenContibutions: childContibution<ID>[] // Fix: Add the missing type argument
} {

    const confidenceChildren = children.filter(child => child.affects === "Confidence")
    const childrenContibutions: childContibution<ID>[] = [];

    if (confidenceChildren.length < 1) {
        return {
            score: {
                pctProMeConfidence: 1,
                pctConMeConfidence: 0,
                unitConfidence: 1,
            },
            childrenContibutions: childrenContibutions,
        }
    }

    let [pctProMeConfidence, pctConMeConfidence, unitConfidence, totalChildrenWeight] = [0, 0, 0, 0];

    for (const child of confidenceChildren) {
        totalChildrenWeight += childWeight(child);
    }

    for (const child of confidenceChildren) {
        const flip = child.proMyParent ? 1 : -1; // Flip it if it is a con (not pro parent)

        // TODO: Can't the unitConfidence be calculated by directly using the pctProMeConfidence and pctConMeConfidence? Maybe even in a separate math example like in the display? Or do we need the weights?
        unitConfidence += child.unitConfidence * child.pctRelevantToMyParent * flip;
        const pctValue = child.unitConfidence * childWeight(child) / totalChildrenWeight * flip;

        // TODO: May need to store children weights for calculating visualizations on fractionOfRoot, but could re-calculate it later if we export the weight function

        if (pctValue > 0) {
            pctProMeConfidence += pctValue;
        } else {
            pctConMeConfidence -= pctValue;
        }

        childrenContibutions.push({
            id: child.id,
            pctValue,
        });
    }

    return {
        score: {
            pctProMeConfidence,
            pctConMeConfidence,
            unitConfidence: unitConfidence > 0 ? unitConfidence : 0, // Currently not reversable so we don't allow negative confidence
        },
        childrenContibutions,
    }

}

function childWeight(score: ScoreWithParent) {
    return Math.abs(score.unitConfidence) * score.pctRelevantToMyParent
}
