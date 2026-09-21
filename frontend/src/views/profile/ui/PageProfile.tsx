'use client'

import { AnimatedMain } from "@/shared/ui";
import { useUserQuery } from "@/entities";
import {
    FullWidthBanner,
    ProfileBannerBlock,
    ProfileAccountContent,
    ProfileComicsContent,
    ProfileFeedContent
} from "@/widgets";
import { AnimatePresence, motion } from "framer-motion";
import { useProfileContext } from "../model/ProfileProvider";

const PageProfile = ({ username }: TPageProfileProps) => {
    const { selectedContent } = useProfileContext()
    const { data: userData } = useUserQuery(username)

    const renderContent = () => {
        switch (selectedContent) {
            case "Account":
                return <ProfileAccountContent username={username} />;
            case "Comics":
                return <ProfileComicsContent username={username} />;
            case "Feed":
                return <ProfileFeedContent username={username} />;
        }
    };

    if (userData) {
        return (
            <AnimatedMain>
                <FullWidthBanner
                image_url={userData.background_url}
                image_alt={userData.username}
                />

                <ProfileBannerBlock
                username={username}
                />

                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                    key={selectedContent}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </AnimatedMain>
        )
    }
    else {
        return null
    }
}

export { PageProfile };

type TPageProfileProps = {
    username: string
}