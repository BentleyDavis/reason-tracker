import { ScoreWithParent, calculateConfidence } from "./calculateConfidence";

describe("calculateConfidence", () => {

    it("should return 0 confidence for .5 pro .5 con", () => {
        const children: ScoreWithParent[] = [
            { pctConfidence: 1, proMyParent: true, pctRelevantToMyParent: 1 },
            { pctConfidence: 1, proMyParent: false, pctRelevantToMyParent: 1 },
        ];

        const result = calculateConfidence(children);

        expect(result.pctProMeConfidence).toEqual(.5);
        expect(result.pctConMeConfidence).toEqual(.5);
        expect(result.pctConfidence).toEqual(0);
    });

    it("two half true", () => {
        const children: ScoreWithParent[] = [
            { pctConfidence: .5, proMyParent: true, pctRelevantToMyParent: 1 },
            { pctConfidence: .5, proMyParent: false, pctRelevantToMyParent: 1 },
        ];

        const result = calculateConfidence(children);

        expect(result.pctProMeConfidence).toEqual(.25);
        expect(result.pctConMeConfidence).toEqual(.25);
        expect(result.pctConfidence).toEqual(0);
    });

    it("mix 1", () => {
        const children: ScoreWithParent[] = [
            { pctConfidence: 1, proMyParent: true, pctRelevantToMyParent: 1 },
            { pctConfidence: .5, proMyParent: false, pctRelevantToMyParent: 1 },
        ];

        const result = calculateConfidence(children);
        expect(result).toMatchSnapshot()
    });

    it("should return -1 confidence for 1 con", () => {
        const children: ScoreWithParent[] = [
            { pctConfidence: 1, proMyParent: false, pctRelevantToMyParent: 1 },
        ];

        const result = calculateConfidence(children);

        expect(result.pctProMeConfidence).toEqual(0);
        expect(result.pctConMeConfidence).toEqual(1);
        expect(result.pctConfidence).toEqual(-1);
    });

    it("should handle empty children array", () => {
        const children: ScoreWithParent[] = [];

        const result = calculateConfidence(children);

        expect(result.pctProMeConfidence).toEqual(1);
        expect(result.pctConMeConfidence).toEqual(0);
        expect(result.pctConfidence).toEqual(1);
    });
});