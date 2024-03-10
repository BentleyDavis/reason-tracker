

export interface Score {
    unitConfidence: number,
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

    let pctProMeConfidence = 0;
    let pctConMeConfidence = 0;
    let unitConfidence = 0;

    let ChildrenWeight = 0;
    for (const child of children) {
        ChildrenWeight += weight(child);
    }

    for (const child of children) {
        const flip = (child.proMyParent === false ? -1 : 1); // Flip it if it is a con (not pro)

        unitConfidence +=
            child.unitConfidence
            * child.pctRelevantToMyParent
            * flip;

        const pctValue =
            child.unitConfidence
            * weight(child) / ChildrenWeight // multiply by the percentage of the total children weight
            * flip;

        if (pctValue > 0) {
            pctProMeConfidence += pctValue
        } else {
            pctConMeConfidence -= pctValue
        }
    }

    return {
        pctProMeConfidence,
        pctConMeConfidence,
        unitConfidence,
    }

}

function weight(score: ScoreWithParent) {
    return Math.abs(score.unitConfidence) * score.pctRelevantToMyParent
}