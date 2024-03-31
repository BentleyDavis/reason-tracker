import { calculate } from "./calculate";
import { simple } from "./examples/simple";
import { slightlyComplex } from "./examples/slightlyComplex";

describe("calculate", () => {

    it("should consistently solve Simple", () => {
        const claims = simple;

        const result = calculate(claims);

        expect(result).toMatchSnapshot();
    });

    it("should calculate scores for slightly complexity", () => {
        const claims = slightlyComplex;

        const result = calculate(claims);

        expect(result).toMatchSnapshot();
    });

});
