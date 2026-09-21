export function processPollOptions(options: string[]) {
    if (JSON.stringify(options) !== JSON.stringify(['', ''])) {
        return JSON.stringify(options.filter(str => str.trim() !== ""))
    }
}