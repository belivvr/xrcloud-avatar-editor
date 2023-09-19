import { useGLTF } from '@react-three/drei'
import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { Group } from 'three'
import { femaleAvatarBlueprint, femaleAvatarInstance, loopThroughBlueprint } from '../blueprints/femaleAvatar'
import { AvatarContextValue, AvatarInstance } from './AvatarContext.type'

export const AvatarContext = React.createContext({} as AvatarContextValue)

export function AvatarProvider({ children }: { children: ReactNode }) {
    const rootRef = useRef<Group>(null)
    const [avatarInstance, setAvatarInstance] = useState<AvatarInstance>(femaleAvatarInstance)

    useEffect(() => {
        loopThroughBlueprint(femaleAvatarBlueprint, (item) => {
            if (item.fileUrl) {
                window.requestIdleCallback(() => {
                    useGLTF.preload(item.fileUrl)
                })
            }
        })
    }, [avatarInstance.skeleton])

    const setBody = (bodyNo: number) => {
        const updatedFemaleAvatarInstance = {
            ...avatarInstance,
            parts: {
                ...avatarInstance.parts,
                Body: femaleAvatarBlueprint.bodies[bodyNo]
            }
        }

        setAvatarInstance(updatedFemaleAvatarInstance)
    }

    const context = {
        avatarInstance,
        rootRef,
        setBody
    }

    return <AvatarContext.Provider value={context}>{children}</AvatarContext.Provider>
}

export const useAvatar = (): AvatarContextValue => useContext(AvatarContext)
