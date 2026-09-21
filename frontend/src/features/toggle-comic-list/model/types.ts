export type TListData = {
	id: string;
	name: string;
	added: boolean
}

export type TPersonalListsResponse = {
	categories: TListData[];
}

export type TPutPersonalListVariables = {
    comic_id: string,
    category_id: string
}

export type TPutPersonalListContext = {
    previousLists?: {
        categories: TListData[]
    }
}

export type TDeletePersonalListVariables = {
    comic_id: string,
    category_id: string
}

export type TDeletePersonalListContext = {
    previousLists?: {
        categories: TListData[]
    }
}