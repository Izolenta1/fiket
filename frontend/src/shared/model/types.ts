export type TErrorData = {
	error: string;
	code: number;
	correlation_id: string;
};

export type TPagination = {
    total: number;
    has_next_page: boolean;
}

export type TWithPagination = {
    pagination: TPagination
}

export type TURLSearchParams = {
	[key: string]: string | string[] | undefined
}

export type TJwtPayload = {
    sub: { [key: string]: any };
    iat?: number;
    exp?: number;
}