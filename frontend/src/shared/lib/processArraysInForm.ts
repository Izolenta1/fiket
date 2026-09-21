export function processArraysInForm({ values, fieldOptions }: TProcessArraysInForm): FormData {
	const formData = new FormData();

	Object.entries(values).forEach(([key, value]) => {
		if (value === undefined || value === null || value === "") return;

		// особые обработки значений, если такие были переданы
		const foundOption = fieldOptions?.find(option => option.key === key);
		if (foundOption) {
			const processedValue = foundOption.function(value)
			if (processedValue) {
				formData.append(key, processedValue);
				return
			}
		}

		// массивы файлов (если будут)
		if (Array.isArray(value) && value[0] instanceof File) {
			value.forEach((item) => {
				formData.append(key, item);
			});
			return;
		}

		// обычные массивы
		if (Array.isArray(value)) {
			value.forEach((item) => {
				formData.append(key, item);
			});
			return;
		}

		// пустые массивы не обрабатываются в целом
		if (Array.isArray(value) && value.length === 0) {
			return;
		}

		// обычные значения
		formData.append(key, String(value));
	});

	return formData;
}

// Any для входного значения, т.к. типизировать это нецелесообразно (сложно) и не влияет особо сильно.
// Главное, чтобы возвращаемое значение было корректно.
type TProcessArraysInForm = {
	values: Record<string, string | string[] | File | File[] | boolean>,
	fieldOptions?: {
		key: string,
		function: (value: any) => string | Blob | undefined
	}[]
}