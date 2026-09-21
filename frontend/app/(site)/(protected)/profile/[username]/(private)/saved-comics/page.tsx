import {
    PageSavedComics,
    generateSavedComicsMetadata
} from "@/views";

export const metadata = generateSavedComicsMetadata()

export default async function SavedComics({ params }: TSavedComicsParametres) {
    const { username } = await params

    return (
        <PageSavedComics
        username={username}
        />
    )
}

type TSavedComicsParametres = {
	params: Promise<{ username: string }>
};