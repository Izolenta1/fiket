import {
    ChromeWrapper
} from "@/widgets";

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <ChromeWrapper>
            {children}
        </ChromeWrapper>
    );
}