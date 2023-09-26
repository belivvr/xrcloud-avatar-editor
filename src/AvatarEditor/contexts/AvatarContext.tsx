import { useGLTF } from '@react-three/drei'
import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { Group } from 'three'
import { allAvatarBlueprints, loopThroughBlueprint, makeAvatarInstance } from '../blueprints'
import { AvatarBlueprint, AvatarContextValue, AvatarInstance } from './AvatarContext.type'

export const AvatarContext = React.createContext({} as AvatarContextValue)

export function AvatarProvider({ children }: { children: ReactNode }) {
    const rootRef = useRef<Group>(null)
    const [avatarBlueprint, setAvatarBlueprint] = useState<AvatarBlueprint>(allAvatarBlueprints[1])
    const [avatarInstance, setAvatarInstance] = useState<AvatarInstance>(makeAvatarInstance(avatarBlueprint))

    useEffect(() => {
        loopThroughBlueprint(avatarBlueprint, (item) => {
            if (item.fileUrl) {
                window.requestIdleCallback(() => {
                    useGLTF.preload(item.fileUrl)
                })
            }
        })
    }, [avatarBlueprint, avatarInstance.skeleton])

    const setBody = (bodyNo: number) => {
        const updatedFemaleAvatarInstance = {
            ...avatarInstance,
            parts: {
                ...avatarInstance.parts,
                Body: avatarBlueprint.bodies[bodyNo]
            }
        }

        setAvatarInstance(updatedFemaleAvatarInstance)
    }

    const setSkeleton = (skeletonNo: number) => {
        const blueprint = allAvatarBlueprints[skeletonNo]
        setAvatarBlueprint(blueprint)

        const instance = makeAvatarInstance(blueprint)
        setAvatarInstance(instance)
    }

    const context = {
        avatarInstance,
        rootRef,
        setBody,
        setSkeleton
    }

    return <AvatarContext.Provider value={context}>{children}</AvatarContext.Provider>
}

export const useAvatar = (): AvatarContextValue => useContext(AvatarContext)
