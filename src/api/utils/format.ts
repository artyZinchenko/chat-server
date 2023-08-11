export const format = (string: string): string[] => {
    if (!string) return [];

    const arr: string[] = string.split(',');
    if (arr?.length > 0) {
        return arr;
    } else {
        return [string];
    }
};
