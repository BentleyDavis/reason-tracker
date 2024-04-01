import { calculateScores } from "./calculateScores";
import { simple } from "./examples/simple";
import { slightlyComplex } from "./examples/slightlyComplex";

describe("calculate", () => {

    it("should consistently solve Simple", () => {
        const claims = simple;

        const result = calculateScores(claims);

        expect(result["mainClaim"]?.unitConfidence).toEqual(0)
        expect(result).toMatchSnapshot();
    });

    it("should calculate scores for slightly complexity", () => {
        const claims = slightlyComplex;

        const result = calculateScores(claims);
        expect(result["mainClaim"]?.unitConfidence).toEqual(13 / 18)
        expect(result).toMatchSnapshot();
    });

});
