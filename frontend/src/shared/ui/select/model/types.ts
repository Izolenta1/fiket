export type TSelectValue = string | number;

export type TSelectOption<T extends TSelectValue> = {
    value: T;
    label: string
}