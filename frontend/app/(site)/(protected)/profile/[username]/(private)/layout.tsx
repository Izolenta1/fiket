import { cookies } from "next/headers";
import { getUserFromToken } from "@/shared/lib";
import { notFound } from "next/navigation";

export default async function PrivateLayout({ children, params }: TProfileLayoutProps) {
    const { username } = await params

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const user = await getUserFromToken(accessToken)

    if (username !== user?.username) {
        notFound()
    }
    
    return (
        <>
            {children}
        </>
    );
}

type TProfileLayoutProps = {
    children: React.ReactNode,
    params: Promise<{ username: string }>
}