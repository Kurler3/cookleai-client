

export default function getObjectDifferences<T extends Record<string, any>>(obj1: T, obj2: T): Partial<T> {

    const differences: Partial<T> = {};

    for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            if (obj1[key] !== obj2[key]) {
                differences[key] = obj2[key];
            }
        }
    }

    // Remaining keys on object 2, that are not in object 1.
    for (const key in obj2) {
        if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
            differences[key] = obj2[key];
        }
    }

    return differences;
}