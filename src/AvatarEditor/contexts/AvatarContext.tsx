import { useGLTF } from '@react-three/drei'
import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { Group } from 'three'
import { allAvatarBlueprints, loopThroughBlueprint, makeAvatarInstance } from '../blueprints'
import { AvatarBlueprint, AvatarContextValue, AvatarInstance } from './AvatarContext.type'

파츠를 export 할 때 animations 체크 안 하면 크기가 줄어드는 것 같다
아바다 교체하면 애니메이션이 제대로 안 되는 것 같다.

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
