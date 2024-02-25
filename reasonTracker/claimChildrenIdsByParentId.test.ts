import { simple } from "./examples/simple";
import { claimChildrenIdsByParentId } from "./claimChildrenIdsByParentId";

describe("getEdgeIdsByToId", () => {
    it("should return an array of edge IDs for the given toId", () => {

        const result = claimChildrenIdsByParentId(simple);

        expect(result).toEqual({ "mainClaim": ["pro1", "con1"] });
    });


});
