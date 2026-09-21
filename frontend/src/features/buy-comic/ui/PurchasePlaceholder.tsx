import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { LoadingBlock } from "@/shared/ui";
import {
    useUser,
    useGlobalToast
} from "@/global/providers";
import { usePaymentMutation } from "../model/mutations";

const PurchasePlaceholder = ({ comic_id, cost }: TPurchasePlaceholderProps) => {
    const { user } = useUser()
    const { createToast } = useGlobalToast()

    const {mutate: postPaymentMutate, isPending: isPostPaymentPending} = usePaymentMutation({
        onSuccess(data, { comic_id }) {
            window.location.href = data.url
        },
        onError: (error, { comic_id }) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для покупки комикса необходима авторизация." })
            }
            else {
                createToast({ type: "negative", text: "Ошибка сервера." })
            }
        }
    })

    async function buyComic() {
        if (!Boolean(user)) {
            createToast({ type: "negative", text: "Для покупки комикса необходима авторизация." })
            return
        }

        postPaymentMutate({ comic_id })
    }

    return (
        <div
        className={clsx(
        "flex flex-col justify-center items-center gap-[12px]",
        "absolute right-0 left-0 top-[-12px] bottom-[-12px]",
        "backdrop-blur-[6px] bg-surface_blure"
        )}
        >
            <button
            onClick={buyComic}
            className={clsx(
            "h-fit flex items-center justify-center",
            "px-[16px] py-[8px]",
            "border-[1px] bg-surface_body rounded-[12px]",
            "button_regular transition-all duration-[400ms]",
            isPostPaymentPending ? "border-texticon_base_default text-texticon_base_default" : "border-texticon_base_accent text-texticon_base_accent"
            )}
            disabled={isPostPaymentPending}
            >Получить доступ — {cost} ₽</button>

            <AnimatePresence
            initial={false}
            mode="popLayout"
            >
                <motion.div
                key={isPostPaymentPending.toString()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease:"easeInOut" }}
                >
                    {isPostPaymentPending && <LoadingBlock />}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export { PurchasePlaceholder };

type TPurchasePlaceholderProps = {
    comic_id: string,
    cost: number
}