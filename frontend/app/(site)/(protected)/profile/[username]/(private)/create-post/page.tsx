import {
    PageCreatePost,
    generateCreatePostMetadata
} from "@/views";

export const metadata = generateCreatePostMetadata()

export default async function CreatePost({ params }: TCreatePostParametres) {
    const { username } = await params

    return (
        <PageCreatePost
        username={username}
        />
    )
}

type TCreatePostParametres = {
	params: Promise<{ username: string }>
};