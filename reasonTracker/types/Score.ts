
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
    pctProMeConfidence: number;
    pctConMeConfidence: number;
}

export interface ScoreWithParent extends Score {
    proMyParent: boolean;
    pctRelevantToMyParent: number;
    affects: "Confidence" | "Relevance";
}

export interface childContibution<ID> extends HasId<ID> {
    pctValue: number;
}

export type ChildScore<ID> = ScoreWithParent & HasId<ID>;
