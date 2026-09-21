'use client'

import {
    createContext,
    useContext,
    useState
} from "react";

type TProfileStore = {
    profileCondition: string;
    selectedContent: string
    setSelectedContent: React.Dispatch<React.SetStateAction<string>>
}

const ProfileContext = createContext<TProfileStore | undefined>(undefined);

const ProfileProvider = ({ children, profileCondition }: { children: React.ReactNode, profileCondition: string }) => {
    const [selectedContent, setSelectedContent] = useState("Account");
    
    return (
        <ProfileContext.Provider
        value={{
        profileCondition,
        selectedContent,
        setSelectedContent
        }}
        >
            {children}
        </ProfileContext.Provider>
    );
}

export { ProfileProvider };

export function useProfileContext() {
    const ctx = useContext(ProfileContext);
    if (ctx === undefined) {
        throw new Error("useProfileContext must be used inside ProfileProvider");
    }
    return ctx;
}