'use client'

import { createContext, useContext, useState } from "react";

type TUser = {
    id: string;
    username: string;
}

type TUserStore = {
    user: TUser | null;
    clearUser: () => void;
};

const UserContext = createContext<TUserStore | undefined>(undefined);

const UserProvider = ({ children, initialUser }: { children: React.ReactNode, initialUser: TUser | null }) => {
    const [user, setUser] = useState<TUser | null>(initialUser);

    function clearUser() {
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ user, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider };

export function useUser() {
    const ctx = useContext(UserContext);
    if (ctx === undefined) {
        throw new Error("useUser must be used inside UserProvider");
    }
    return ctx;
}