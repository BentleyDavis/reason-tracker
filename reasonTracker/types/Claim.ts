import { Id } from "./Item";

export type Claim = {
    id: ClaimId;
    type: "Claim";
}

export type ClaimId = Id & { readonly __brand: unique symbol };