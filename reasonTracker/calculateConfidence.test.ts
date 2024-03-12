import { HasId, ScoreWithParent, calculateConfidence } from "./calculateConfidence";

describe("calculateConfidence", () => {

    it("should return 0 confidence for 1 pro & 1 con", () => {
        const children: (ScoreWithParent & HasId)[] = [
            { id: '1', unitConfidence: 1, proMyParent: true, pctRelevantToMyParent: 1, affects: "Confidence" },
            { id: '2', unitConfidence: 1, proMyParent: false, pctRelevantToMyParent: 1, affects: "Confidence" },
        ];

        const { score, childrenContibution } = calculateConfidence(children);

        expect(score.pctProMeConfidence).toEqual(.5);
        expect(score.pctConMeConfidence).toEqual(.5);
        expect(score.unitConfidence).toEqual(0);
    });

    it("two half true", () => {
        const children: (ScoreWithParent & HasId)[] = [
            { id: '1', unitConfidence: .5, proMyParent: true, pctRelevantToMyParent: 1, affects: "Confidence" },
            { id: '2', unitConfidence: .5, proMyParent: false, pctRelevantToMyParent: 1, affects: "Confidence" },
        ];

        const { score, childrenContibution } = calculateConfidence(children);

        expect(score.pctProMeConfidence).toEqual(.25);
        expect(score.pctConMeConfidence).toEqual(.25);
        expect(score.unitConfidence).toEqual(0);
    });

    it("mix 1", () => {
        const children: (ScoreWithParent & HasId)[] = [
            { id: '1', unitConfidence: 1, proMyParent: true, pctRelevantToMyParent: 1, affects: "Confidence" },
            { id: '2', unitConfidence: .5, proMyParent: false, pctRelevantToMyParent: 1, affects: "Confidence" },
        ];

        const { score, childrenContibution } = calculateConfidence(children);
        expect(score).toMatchSnapshot()
    });

    it("mix 2", () => {
        const children: (ScoreWithParent & HasId)[] = [
            { id: '1', unitConfidence: 1, proMyParent: true, pctRelevantToMyParent: 1, affects: "Confidence" },
            { id: '2', unitConfidence: 1, proMyParent: false, pctRelevantToMyParent: .5, affects: "Confidence" },
        ];

        const { score, childrenContibution } = calculateConfidence(children);
        expect(score.pctProMeConfidence).toEqual(0.6666666666666666);
        expect(score.pctConMeConfidence).toEqual(0.3333333333333333);
        expect(score.unitConfidence).toEqual(.5);
    });

    it("should return 0 confidence for 1 con (non-reversable)", () => {
        const children: (ScoreWithParent & HasId)[] = [
            { id: '1', unitConfidence: 1, proMyParent: false, pctRelevantToMyParent: 1, affects: "Confidence" },
        ];

        const { score, childrenContibution } = calculateConfidence(children);

        expect(score.pctProMeConfidence).toEqual(0);
        expect(score.pctConMeConfidence).toEqual(1);
        expect(score.unitConfidence).toEqual(0);
    });

    it("should handle empty children array", () => {
        const children: (ScoreWithParent & HasId)[] = [];

        const { score, childrenContibution } = calculateConfidence(children);

        expect(score.pctProMeConfidence).toEqual(1);
        expect(score.pctConMeConfidence).toEqual(0);
        expect(score.unitConfidence).toEqual(1);
    });

    it("should ignore relevance claims", () => {
        const children: (ScoreWithParent & HasId)[] = [
            { id: '1', unitConfidence: 1, proMyParent: false, pctRelevantToMyParent: 1, affects: "Relevance" },
        ];

        const { score, childrenContibution } = calculateConfidence(children);

        expect(score.pctProMeConfidence).toEqual(1);
        expect(score.pctConMeConfidence).toEqual(0);
        expect(score.unitConfidence).toEqual(1);
    });
});