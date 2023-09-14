import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { Group } from 'three'
import { getParts, getRoot } from '../configs'
import {
    AvatarContextValue,
    Current,
    PartOld,
    RootOptions
} from './AvatarContext.type'

export const AvatarContext = createContext<AvatarContextValue>({
    root: null!,
    current: {}
})

const setDefaultCurrentByPart = (parts: PartOld): Current => {
    const obj: Current = {}

    for (const key in parts) {
        const part = parts[key]

        if (part.resources ) {
            const defaultResource = part.resources.find(({ id }) => id === part.defaultResource)

            obj[key] = defaultResource ?? null
        }
    }

    return obj
}

export function AvatarProvider({ children }: { children: ReactNode }) {
    const rootRef = useRef<Group>(null!)
    const [current, setCurrent] = useState<Current>(null!)
    const [root, setRoot] = useState<RootOptions>(getRoot())
    const [parts, setParts] = useState<PartOld>(getParts())

    useEffect(() => {
        setRoot(getRoot())
        setParts(getParts())
    }, [])

    useEffect(() => {
        const defaultCurrent = setDefaultCurrentByPart(parts)
        setCurrent(defaultCurrent)
    }, [parts])

    const context = {
        root: {
            ...root,
            ref: rootRef
        },
        parts,
        current
    }

    return (
        <AvatarContext.Provider value={context}>
                {children}
        </AvatarContext.Provider>
    )
}

export const useAvatar = (): AvatarContextValue => useContext(AvatarContext)
