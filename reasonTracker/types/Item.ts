import { Dictionary } from "@/utils/Dictionary";

/**
 * An item is a contract of what exists on all data objects. Mostly just an ID and a type. 
 * This is often extended by the data items
 */
export type Item<T extends string, I extends Id> = {
    type: T,
    id: I,
}

export type Id = string & { readonly __id: unique symbol };

export type Items<T> = Dictionary<T>;


// export function push<T extends string, ID extends Id, In extends Item<T, ID>>(item: In, index: Dictionary<In[]>): void {
//     (index[item.id] = index[item.id] ?? []).push(item);
// }


