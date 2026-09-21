'use client'

import { NoDataPlug } from "@/shared/ui";
import { AnimatedMain } from "@/shared/ui";
import { Button } from '@/shared/ui';
import { useRouter } from "next/navigation";
import clsx from "clsx";

const PageNotFound = () => {
    const router = useRouter()

    function goToHome() {
        router.push("/")
    }

    return (
        <AnimatedMain>
            <span
            className={clsx(
            "w-full flex justify-center items-center",
            "decor_bold text-surface_secondary",
            "mb-[-5.5vw]",
            "bp700px:mb-[-2.86vw]",
            "bp1200px:mb-[-20px]"
            )}
            >404</span>

            <NoDataPlug
            text="Ооой, очень странно. Страница, которую вы искали, не найдена :<"
            />

            <Button
            text='На главную страницу'
            variant='primary'
            onClick={goToHome}
            classNames={{
            wrapper: "self-center bp700px:max-w-[45.71vw] bp1200px:max-w-[320px]"
            }}
            />
        </AnimatedMain>
    );
};

export { PageNotFound };