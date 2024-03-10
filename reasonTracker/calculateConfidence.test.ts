import { ScoreWithParent, calculateConfidence } from "./calculateConfidence";

describe("calculateConfidence", () => {

    it("should return 0 confidence for 1 pro & 1 con", () => {
        const children: ScoreWithParent[] = [
            { unitConfidence: 1, proMyParent: true, pctRelevantToMyParent: 1 },
            { unitConfidence: 1, proMyParent: false, pctRelevantToMyParent: 1 },
        ];

        const result = calculateConfidence(children);

        expect(result.pctProMeConfidence).toEqual(.5);
        expect(result.pctConMeConfidence).toEqual(.5);
        expect(result.unitConfidence).toEqual(0);
    });

    it("two half true", () => {
        const children: ScoreWithParent[] = [
            { unitConfidence: .5, proMyParent: true, pctRelevantToMyParent: 1 },
            { unitConfidence: .5, proMyParent: false, pctRelevantToMyParent: 1 },
        ];

        const result = calculateConfidence(children);

        expect(result.pctProMeConfidence).toEqual(.25);
        expect(result.pctConMeConfidence).toEqual(.25);
        expect(result.unitConfidence).toEqual(0);
    });

    it("mix 1", () => {
        const children: ScoreWithParent[] = [
            { unitConfidence: 1, proMyParent: true, pctRelevantToMyParent: 1 },
            { unitConfidence: .5, proMyParent: false, pctRelevantToMyParent: 1 },
        ];

        const result = calculateConfidence(children);
        expect(result).toMatchSnapshot()
    });

    it("mix 2", () => {
        const children: ScoreWithParent[] = [
            { unitConfidence: 1, proMyParent: true, pctRelevantToMyParent: 1 },
            { unitConfidence: 1, proMyParent: false, pctRelevantToMyParent: .5 },
        ];

        const result = calculateConfidence(children);
        expect(result.pctProMeConfidence).toEqual(0.6666666666666666);
        expect(result.pctConMeConfidence).toEqual(0.3333333333333333);
        expect(result.unitConfidence).toEqual(.5);
    });

    it("should return 0 confidence for 1 con (non-reversable)", () => {
        const children: ScoreWithParent[] = [
            { unitConfidence: 1, proMyParent: false, pctRelevantToMyParent: 1 },
        ];

        const result = calculateConfidence(children);

        expect(result.pctProMeConfidence).toEqual(0);
        expect(result.pctConMeConfidence).toEqual(1);
        expect(result.unitConfidence).toEqual(0);
    });

    it("should handle empty children array", () => {
        const children: ScoreWithParent[] = [];

        const result = calculateConfidence(children);

        expect(result.pctProMeConfidence).toEqual(1);
        expect(result.pctConMeConfidence).toEqual(0);
        expect(result.unitConfidence).toEqual(1);
    });
});