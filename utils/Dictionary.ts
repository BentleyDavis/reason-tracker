
export function createDict<T extends { id?: unknown }>(list: T[]): { [key: string]: T | undefined };
export function createDict<T, K extends keyof T>(list: T[], prop: K): { [key: string]: T | undefined };
export function createDict<T, K extends keyof T>(list: T[], prop?: K): { [key: string]: T | undefined } {
    const keyProp = prop || "id" as K;
    return list.reduce((dict: { [key: string]: T }, item: T) => {
        dict[String(item[keyProp])] = item;
        return dict;
    }, {} as { [P in K]: T });
}

export function createDictWithId<T extends { id?: unknown }>(list: T[]): { [key: string]: T | undefined } {
    return createDict(list, "id");
}

export type Dictionary<T, K extends string | number | symbol = string> = {
    [P in K]: T | undefined;
};

export function getKeys<T, K extends string>(
    dict: { [P in K]: T; }
) {
    return Object.keys(dict) as K[];
}

export function getEntries<T, K extends string>(
    dict: { [P in K]: T; }
) {
    return (Object.entries(dict) as [K, T][]).filter(([key, value]) => value !== undefined) as [K, Exclude<T, undefined>][];
}

export function getValues<T, K extends string>(
    dict: { [P in K]: T; }
) {
    return (Object.values(dict) as T[]).filter((value) => value !== undefined) as Exclude<T, undefined>[];
}

export function getOne<T, K extends string>(
    id: K,
    dict: { [P in K]: T; },
): T | undefined {
    return dict[id];
}

export function getMany<T, K extends string>(
    ids: K[],
    dict: { [P in K]: T | undefined; },
): T[] {
    return (ids.map(id => dict[id])).filter((item): item is T => item !== undefined);
}
