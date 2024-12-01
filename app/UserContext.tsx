"use client"

import { ReactNode, createContext, useContext, useState, SetStateAction, Dispatch } from 'react'

export interface userType {
    name: string,
    isLoggedin: boolean,
    isVarified: boolean,
    id: number | null,
    profilePic: string
}

interface userContextPropType {
    user: userType,
    setUser: Dispatch<SetStateAction<userType>>
}

const userContext = createContext<userContextPropType | null>(null)

export const UserContextProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<userType>({
        name: '',
        isLoggedin: false,
        isVarified: false,
        id: null,
        profilePic: ''
    })

    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}

export function useUserContext() {
    const userContextData = useContext(userContext)
    if(!userContextData) throw new Error("Context not accessable!");
    return userContextData;
}
