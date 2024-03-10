import { sortEdgeIdsLeavesToRoot } from "./sortLeavesToRoot";
import { simple } from "./examples/simple";

describe("sortEdgeIdsLeavesToRoot", () => {
    it("should return a list of claimIds ordered from leaves to the root", () => {
        const result = sortEdgeIdsLeavesToRoot(simple);
        expect(result[2]).toEqual("mainClaim");
        expect(result.length).toEqual(3);
    });
});