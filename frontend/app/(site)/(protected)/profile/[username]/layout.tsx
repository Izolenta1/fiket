import { ProfileProvider } from "@/views";
import { getQueryClient } from "@/shared/api";
import { notFound } from "next/navigation";
import { getUser } from "@/entities";
import { cookies } from "next/headers";
import { getUserFromToken } from "@/shared/lib";
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

export default async function ProfileLayout({ children, params }: TProfileLayoutProps) {
    const { username } = await params

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const user = await getUserFromToken(accessToken)

    const queryClient = getQueryClient()

    const user_data = await queryClient.fetchQuery({
        queryKey: ["profile", username],
        queryFn: () => getUser(username)
    })
    .catch((e) => {
        if (e?.status > 400) notFound();
        throw e;
    });

    function processProfileCondition(): string {
        if (username === user?.username) {
            if (user_data.author) {
                return "ME AUTHOR"
            }
            return "ME"
        }
        else {
            if (user_data.author) {
                return "AUTHOR"
            }
            notFound()
        }
    }

    const profileCondition = processProfileCondition()
    
    return (
        <HydrationBoundary
		state={dehydrate(queryClient)}
		>
            <ProfileProvider
            profileCondition={profileCondition}
            >
                {children}
            </ProfileProvider>
        </HydrationBoundary>
    );
}

type TProfileLayoutProps = {
    children: React.ReactNode,
    params: Promise<{ username: string }>
}