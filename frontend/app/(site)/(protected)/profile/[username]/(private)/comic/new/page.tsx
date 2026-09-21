import {
    PageNewComic,
    generateNewComicMetadata
} from "@/views";

export const metadata = generateNewComicMetadata()

export default async function CreateComic({ params }: TCreateComicParametres) {
    const { username } = await params

    return (
        <PageNewComic
        username={username}
        />
    )
}

type TCreateComicParametres = {
	params: Promise<{ username: string }>
};