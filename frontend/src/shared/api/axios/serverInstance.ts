'use server'

import axios from "axios";

const createServerApi = async ({ baseURL, accessToken }: TCreateServerApi) => {
    const instance = axios.create({
		baseURL,
		withCredentials: true,
        headers: {
            Authorization: accessToken
        }
	});

    return instance
}

export { createServerApi }

type TCreateServerApi = {
    baseURL: string | undefined,
    accessToken: string | undefined
}