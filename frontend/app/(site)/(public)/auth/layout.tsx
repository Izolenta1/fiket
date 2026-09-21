import { cookies } from "next/headers";
import { getUserFromToken } from "@/shared/lib";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    const user = await getUserFromToken(accessToken, )

    if (user) {
        redirect('/');
    }
    
    return (
        <>
            {children}
        </>
    );
}