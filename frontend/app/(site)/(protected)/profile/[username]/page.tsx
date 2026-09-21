import {
    PageProfile,
    generateProfileMetadata,
    generateProfileJsonLd
} from "@/views";
import { getUser } from "@/entities";

export async function generateMetadata({ params }: TProfilePageParametres) {
    const { username } = await params

    try {
        const user = await getUser(username)
        return generateProfileMetadata(user)
    }
    catch {
        return {}
    }
}

export default async function Profile({ params }: TProfilePageParametres) {
    const { username } = await params
    const user = await getUser(username)

    return (
        <>
            <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProfileJsonLd(user)) }}
            />

            <PageProfile
            username={username}
            />
        </>
    )
}

type TProfilePageParametres = {
	params: Promise<{ username: string }>
};