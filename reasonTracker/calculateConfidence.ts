

export interface Score {
    /**
     * The calculated confidence of the claim from 1 to -1
     *  1.0 likely true or assumed true
     *  0.5 probably true
     *  0.0 unknown
     * -0.5 probably false ** currently not allowed
     * -1.0 likely false
     */
    unitConfidence: number;
}

export interface ScoreWithDisplayData extends Score {
    pctProMeConfidence: number
    pctConMeConfidence: number
}

export interface ScoreWithParent extends Score {
    proMyParent: boolean
    pctRelevantToMyParent: number
}

export function calculateConfidence(children: ScoreWithParent[]): ScoreWithDisplayData {
    if (children.length < 1) {
        return {
            pctProMeConfidence: 1,
            pctConMeConfidence: 0,
            unitConfidence: 1,
        }
    }

    let [pctProMeConfidence, pctConMeConfidence, unitConfidence, totalChildrenWeight] = [0, 0, 0, 0];

    for (const child of children) {
        totalChildrenWeight += weight(child);
    }

    for (const child of children) {
        const flip = child.proMyParent ? 1 : -1; // Flip it if it is a con (not pro parent)

        unitConfidence += child.unitConfidence * child.pctRelevantToMyParent * flip;
        const pctValue = child.unitConfidence * weight(child) / totalChildrenWeight * flip;

        // TODO: May need to store children weights for calculating visualizations on fractionOfRoot, but could re-calculate it later if we export the weight function

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

function weight(score: ScoreWithParent) {
    return Math.abs(score.unitConfidence) * score.pctRelevantToMyParent
}