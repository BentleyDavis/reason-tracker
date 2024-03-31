import { ScoreWithParent } from "./types/Score";
import { calculateRelevance } from "./calculateRelevance";

describe("calculateRelevance", () => {

    it("should return 1 for empty children array", () => {
        const children: ScoreWithParent[] = [];

        const result = calculateRelevance(children);

        expect(result).toEqual(1);
    });

    it("should return 1 for children array without relevance affects", () => {
        const children: ScoreWithParent[] = [
            { unitConfidence: 1, proMyParent: true, pctRelevantToMyParent: 1, affects: "Confidence" },
        ];

        const result = calculateRelevance(children);

        expect(result).toEqual(1);
    });

    it("1 pro should double", () => {
        const children: ScoreWithParent[] = [
            { unitConfidence: 1, proMyParent: true, pctRelevantToMyParent: 1, affects: "Relevance" },
        ];

        const result = calculateRelevance(children);

        expect(result).toEqual(2);
    });

    it("1 con should halve", () => {
        const children: ScoreWithParent[] = [
            { unitConfidence: 1, proMyParent: false, pctRelevantToMyParent: 1, affects: "Relevance" },
        ];

        const result = calculateRelevance(children);

        expect(result).toEqual(0.5);
    });

    it("2 pro should quadruple", () => {
        const children: ScoreWithParent[] = [
            { unitConfidence: 1, proMyParent: true, pctRelevantToMyParent: 1, affects: "Relevance" },
            { unitConfidence: 1, proMyParent: true, pctRelevantToMyParent: 1, affects: "Relevance" },
        ];

        const result = calculateRelevance(children);

        expect(result).toEqual(4);
    });

    it("2 con should quarter", () => {
        const children: ScoreWithParent[] = [
            { unitConfidence: 1, proMyParent: false, pctRelevantToMyParent: 1, affects: "Relevance" },
            { unitConfidence: 1, proMyParent: false, pctRelevantToMyParent: 1, affects: "Relevance" },
        ];

        const result = calculateRelevance(children);

        expect(result).toEqual(.25);
    });



});