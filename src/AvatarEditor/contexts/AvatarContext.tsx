import { createContext, ReactNode, useContext, useRef, useState } from 'react'
import { Group } from 'three'
import { defaultAvatarInstance } from '../blueprints'
import { AvatarContextValue, AvatarInstance } from './AvatarContext.type'

export const AvatarContext = createContext<AvatarContextValue>({
    avatarInstance: defaultAvatarInstance,
    rootRef: { current: null }
})

export function AvatarProvider({ children }: { children: ReactNode }) {
    const rootRef = useRef<Group>(null)
    const [avatarInstance, setAvatarInstance] = useState<AvatarInstance>(defaultAvatarInstance)

    const context = {
        avatarInstance,
        rootRef
    }

    return <AvatarContext.Provider value={context}>{children}</AvatarContext.Provider>
}

export const useAvatar = (): AvatarContextValue => useContext(AvatarContext)
