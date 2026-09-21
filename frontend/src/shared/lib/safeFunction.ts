export async function safe<T, E = Error>(fn: Promise<T> | (() => T)): Promise<[E | null, T | null]> {
	try {
		const data = await (fn instanceof Promise ? fn : Promise.resolve().then(fn));;
		return [null, data];
	} catch (err) {
		return [err as E, null];
	}
}