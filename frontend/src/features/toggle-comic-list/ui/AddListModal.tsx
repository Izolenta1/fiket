import {
    Modal,
    ScrollbarWrapper,
    XmarkIcon,
} from "@/shared/ui";
import {
    useGlobalToast,
    useUser
} from '@/global/providers';
import { usePersonalLists } from "../model/queries";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { AddListModalToggle } from "./AddListModalToggle";
import { interpretateListName } from "@/shared/lib";
import {
    usePutPersonalListMutation,
    useDeletePersonalListMutation
} from "../model/mutations";
import {
    TPersonalListsResponse
} from "../model/types";
import { produce } from "immer";

const AddListModal = ({ open, onClose, comic_id }: TAddListModalProps) => {
    const { user } = useUser()
    const { createToast } = useGlobalToast()
    
    const { data: personalLists } = usePersonalLists(Boolean(user), comic_id)

    const queryClient = useQueryClient()
    const {mutate: putPersonalListMutate} = usePutPersonalListMutation({
        onMutate: async ({ comic_id, category_id }) => {
            await queryClient.cancelQueries({ queryKey: ["personal_lists", comic_id] })
            const previousLists = queryClient.getQueryData<TPersonalListsResponse>(["personal_lists", comic_id])

            queryClient.setQueryData<TPersonalListsResponse>(
                ["personal_lists", comic_id],
                prev =>
                    prev &&
                    produce(prev, draft => {
                        const category = draft.categories.find(
                            (item) => item.id === category_id
                        );

                        if (category) {
                            category.added = true;
                        }
                    })
            )

            return { previousLists }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["personal_lists", comic_id] })
        },
        onError: (error, { comic_id }, context) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для добавления в список необходима авторизация." })
            }

            if (context?.previousLists !== undefined) {
                queryClient.setQueryData(["personal_lists", comic_id], context.previousLists)
            }
        }
    })

    const {mutate: deletePersonalListMutate} = useDeletePersonalListMutation({
        onMutate: async ({ comic_id, category_id }) => {
            await queryClient.cancelQueries({ queryKey: ["personal_lists", comic_id] })
            const previousLists = queryClient.getQueryData<TPersonalListsResponse>(["personal_lists", comic_id])

            queryClient.setQueryData<TPersonalListsResponse>(
                ["personal_lists", comic_id],
                prev =>
                    prev &&
                    produce(prev, draft => {
                        const category = draft.categories.find(
                            (item) => item.id === category_id
                        );

                        if (category) {
                            category.added = false;
                        }
                    })
            )

            return { previousLists }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["personal_lists", comic_id] })
        },
        onError: (error, { comic_id }, context) => {
            if (error.response?.status === 401 || error.response?.status === 422) {
                createToast({ type: "negative", text: "Для удаления из списка необходима авторизация." })
            }

            if (context?.previousLists !== undefined) {
                queryClient.setQueryData(["personal_lists", comic_id], context.previousLists)
            }
        }
    })

    function addToList(comic_id: string, category_id: string) {
        if (!Boolean(user)) {
            createToast({ type: "negative", text: "Для добавления в список необходима авторизация." })
            return
        }

        putPersonalListMutate({ comic_id: comic_id, category_id: category_id })
    }

    function deleteFromList(comic_id: string, category_id: string) {
        if (!Boolean(user)) {
            createToast({ type: "negative", text: "Для удаления из списка необходима авторизация." })
            return
        }

        deletePersonalListMutate({ comic_id: comic_id, category_id: category_id })
    }

    if (personalLists) {
        return (
            <Modal
            open={open}
            onClose={onClose}
            >
                <div
                className={clsx(
                "flex flex-col gap-[3.3vw]",
                "bp700px:gap-[2.29vw]",
                "bp1200px:gap-[20px]"
                )}
                >
                    
                    {/* Заголовок */}
                    <div
                    className={clsx(
                    "flex items-center justify-between"
                    )}
                    >
                        <p
                        className={clsx(
                        "label_l2 text-texticon_base_header select-none"
                        )}
                        >Добавить в список</p>

                        <button
                        onClick={onClose}
                        className={clsx(
                        "cursor-pointer increase_hover_anim"
                        )}
                        >
                            <XmarkIcon
                            svg_className={clsx(
                            "w-[6.6vw] h-[6.6vw]",
                            "bp700px:w-[4.57vw] bp700px:h-[4.57vw]",
                            "bp1200px:w-[32px] bp1200px:h-[32px]"
                            )}
                            path_className={clsx(
                            "stroke-texticon_base_header"
                            )}
                            />
                        </button>
                    </div>

                    {/* Враппер листов */}
                    <ScrollbarWrapper
                    classNames={{
                    root: "max-h-[69.4vw] bp700px:max-h-[42.86vw] bp1200px:max-h-[350px]",
                    wrapper: "gap-[2.2vw] bp700px:gap-[1.14vw] bp1200px:gap-[8px]"
                    }}
                    >
                        {personalLists.categories.map(list =>
                        <AddListModalToggle
                        key={list.id}
                        name={interpretateListName(list.name)}
                        isToggled={list.added}
                        trueCallback={() => addToList(comic_id, list.id)}
                        falseCallback={() => deleteFromList(comic_id, list.id)}
                        />
                        )}
                    </ScrollbarWrapper>
                </div>
            </Modal>
        )
    }

    return (
        null
    )
}

export { AddListModal };

type TAddListModalProps = {
    open: boolean,
    onClose: () => void;
    comic_id: string
}