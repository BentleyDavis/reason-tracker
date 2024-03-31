import { only } from "node:test";
import { calculateConfidence } from "./calculateConfidence";
import { HasId, ScoreWithParent, ChildScore } from "./types/Score";

describe("calculateConfidence", () => {

    it("should return 0 confidence for 1 pro & 1 con", () => {
        const children: (ChildScore<string>)[] = [
            { id: '1', unitConfidence: 1, proMyParent: true, pctRelevantToMyParent: 1, affects: "Confidence" },
            { id: '2', unitConfidence: 1, proMyParent: false, pctRelevantToMyParent: 1, affects: "Confidence" },
        ];

        const score = calculateConfidence(children);

        expect(score.pctProMeConfidence).toEqual(.5);
        expect(score.pctConMeConfidence).toEqual(.5);
        expect(score.unitConfidence).toEqual(0);
    });

    it("two half true", () => {
        const children: (ChildScore<string>)[] = [
            { id: '1', unitConfidence: .5, proMyParent: true, pctRelevantToMyParent: 1, affects: "Confidence" },
            { id: '2', unitConfidence: .5, proMyParent: false, pctRelevantToMyParent: 1, affects: "Confidence" },
        ];

        const score = calculateConfidence(children);
        expect(score.pctProMeConfidence).toEqual(.25);
        expect(score.pctConMeConfidence).toEqual(.25);
        expect(score.unitConfidence).toEqual(0);
    });

    it("mix 1", () => {
        const children: (ChildScore<string>)[] = [
            { id: '1', unitConfidence: 1, proMyParent: true, pctRelevantToMyParent: 1, affects: "Confidence" },
            { id: '2', unitConfidence: .5, proMyParent: false, pctRelevantToMyParent: 1, affects: "Confidence" },
        ];

        const score = calculateConfidence(children);
        expect(score).toMatchSnapshot()
    });

    it("mix 2", () => {
        const children: (ChildScore<string>)[] = [
            { id: '1', unitConfidence: 1, proMyParent: true, pctRelevantToMyParent: 1, affects: "Confidence" },
            { id: '2', unitConfidence: 1, proMyParent: false, pctRelevantToMyParent: .5, affects: "Confidence" },
        ];

        const score = calculateConfidence(children);
        expect(score.pctProMeConfidence).toEqual(2 / 3);
        expect(score.pctConMeConfidence).toEqual(1 / 3);
        expect(score.unitConfidence).toEqual(.5);
    });

    it("should return 0 confidence for 1 con (non-reversable)", () => {
        const children: (ChildScore<string>)[] = [
            { id: '1', unitConfidence: 1, proMyParent: false, pctRelevantToMyParent: 1, affects: "Confidence" },
        ];

        const score = calculateConfidence(children);

        expect(score.pctProMeConfidence).toEqual(0);
        expect(score.pctConMeConfidence).toEqual(1);
        expect(score.unitConfidence).toEqual(0);
    });

    it("should handle empty children array", () => {
        const children: (ChildScore<string>)[] = [];

        const score = calculateConfidence(children);

        expect(score.pctProMeConfidence).toEqual(1);
        expect(score.pctConMeConfidence).toEqual(0);
        expect(score.unitConfidence).toEqual(1);
    });

    it("should ignore relevance claims", () => {
        const children: (ChildScore<string>)[] = [
            { id: '1', unitConfidence: 1, proMyParent: false, pctRelevantToMyParent: 1, affects: "Relevance" },
        ];

        const score = calculateConfidence(children);

        expect(score.pctProMeConfidence).toEqual(1);
        expect(score.pctConMeConfidence).toEqual(0);
        expect(score.unitConfidence).toEqual(1);
    });

    it("should handle 2 pro 1 con", () => {

        const children: (ChildScore<string>)[] = [
            { id: '1', unitConfidence: 1, proMyParent: true, pctRelevantToMyParent: 1, affects: "Confidence" },
            { id: '2', unitConfidence: 1, proMyParent: true, pctRelevantToMyParent: 1, affects: "Confidence" },
            { id: '3', unitConfidence: 1, proMyParent: false, pctRelevantToMyParent: 1, affects: "Confidence" },
        ];

        const score = calculateConfidence(children);

        expect(score.pctProMeConfidence).toEqual(2 / 3);
        expect(score.pctConMeConfidence).toEqual(1 / 3);
        expect(score.unitConfidence).toEqual(1 / 3);
    });
});