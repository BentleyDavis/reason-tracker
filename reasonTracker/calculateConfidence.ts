

export interface Score {
    pctConfidence: number,
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
            pctConfidence: 1,
        }
    }

    let pctProMeConfidence = 0;
    let pctConMeConfidence = 0;
    let pctConfidence = 0;

    let ChildrenWeight = 0;
    for (const child of children) {
        ChildrenWeight += weight(child);
    }

    for (const child of children) {
        const childValue =
            child.pctConfidence
            * weight(child) / ChildrenWeight // multiply by the percentage of the total children weight
            * (child.proMyParent === false ? -1 : 1); // Flip it if it is a con (not pro)

        pctConfidence += childValue

        if (childValue > 0) {
            pctProMeConfidence += childValue
        } else {
            pctConMeConfidence += -childValue
        }
    }

    return {
        pctProMeConfidence,
        pctConMeConfidence,
        pctConfidence,
    }

}

function weight(score: ScoreWithParent) {
    return Math.abs(score.pctConfidence) * score.pctRelevantToMyParent
}