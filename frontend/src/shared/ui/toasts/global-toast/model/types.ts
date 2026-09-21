export type TGlobalToast = {
    id: string;
    type: "positive" | "negative",
    text: string,
}

export type TGlobalToastCreation = {
    id?: string;
    type: "positive" | "negative",
    text: string,
}