import {
    Header,
    Footer
} from "@/widgets";

const ChromeWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
            <Header />
            {children}
            <Footer />
        </>
	);
}

export { ChromeWrapper }