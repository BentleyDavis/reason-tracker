import { simple } from "./examples/simple";
import { getEdgeIdsByToId } from "./getEdgeIdsByToId";
import { Claim } from "./types/Claim";

describe("getEdgeIdsByToId", () => {
    it("should return an array of edge IDs for the given toId", () => {

        const result = getEdgeIdsByToId(simple);

        expect(result).toEqual({ "mainClaim": ["pro1Edge", "con1Edge"] });
    });


});
