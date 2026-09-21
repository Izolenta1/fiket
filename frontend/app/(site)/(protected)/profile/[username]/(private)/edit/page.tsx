import {
    PageProfileEdit,
    generateProfileEditMetadata
} from "@/views"

export const metadata = generateProfileEditMetadata()

export default async function Edit({ params }: TProfilePageEditParametres) {
    const { username } = await params

    return (
        <PageProfileEdit
        username={username}
        />
    )
}

type TProfilePageEditParametres = {
	params: Promise<{ username: string }>
};