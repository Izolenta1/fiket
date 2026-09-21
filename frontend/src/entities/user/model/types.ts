export type TUserResponse = {
	id: string;
	username: string;
	nickname: string;
	birthday: string | null;
	ava_url: string;
	background_url: string;
    author: TAuthorAdditional | null
}

type TAuthorAdditional = {
	id: string;
	about: string | null;
    media_social: TAuthorMedia
}

export type TAuthorMedia = {
    id: string,
    youtube: string | null,
    pinterest: string | null,
    vk: string | null,
    tg: string | null,
    email: string | null,
    dzen: string | null
}