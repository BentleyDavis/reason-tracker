import { Id } from "./Item";
import {ClaimId} from './Claim'

export type Edge = {
    id: EdgeId;
    type: "Edge";
    from: ClaimId;
    to: EdgeId |  ClaimId;
    pro: boolean;
    affects: Affects
}

export type EdgeId = Id & { readonly __brand: unique symbol };

export type Affects = 'Relevance'| 'Confidence'