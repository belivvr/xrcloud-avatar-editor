import { useGLTF } from '@react-three/drei'
import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { Group } from 'three'
import { allAvatarBlueprints, loopThroughBlueprint, makeAvatarInstance } from '../blueprints'
import { MutableRefObject } from 'react'
import { maleAvatarBlueprint } from '../blueprints/maleAvatar'

export interface AvatarContextValue {
    avatarInstance: AvatarInstance
    rootRef: MutableRefObject<Group | null>
    setBody: (bodyNo: number) => void
    setSkeleton: (skeletonNo: number) => void
    setAnimation: (animationNo: number) => void
}

export interface AvatarPart {
    fileUrl: string
}

export interface AvatarBlueprint {
    skeleton: AvatarSkeleton
    hairs: AvatarPart[]
    faces: AvatarPart[]
    bodies: AvatarPart[]
    legs: AvatarPart[]
    feet: AvatarPart[]
    hands: AvatarPart[]
    glasses: AvatarPart[]
}

export interface AvatarSkeleton extends AvatarPart {
    animations: string[]
}

export type AvatarPartName = 'Hair' | 'Face' | 'Body' | 'Leg' | 'Foot' | 'Hand' | 'Glass'

export interface AvatarInstance {
    currentAnimation: string // 현재 적용된 애니메이션
    skeleton: AvatarSkeleton // 사용된 뼈대 정보
    parts: Record<AvatarPartName, AvatarPart | undefined>
}

export const AvatarContext = React.createContext({} as AvatarContextValue)

export function AvatarProvider({ children }: { children: ReactNode }) {
    const rootRef = useRef<Group>(null)
    const [avatarBlueprint, setAvatarBlueprint] = useState<AvatarBlueprint>(allAvatarBlueprints[0])
    const [avatarInstance, setAvatarInstance] = useState<AvatarInstance>(makeAvatarInstance(avatarBlueprint))

    useEffect(() => {
        loopThroughBlueprint(avatarBlueprint, (item) => {
            useGLTF.preload(item.fileUrl)
        })
    }, [avatarBlueprint])

    const setBody = (bodyNo: number) => {
        const updateFemaleAvatarInstance = {
            ...avatarInstance,
            parts: {
                ...avatarInstance.parts,
                Body: avatarBlueprint.bodies[bodyNo]
            }
        }

        setAvatarInstance(updateFemaleAvatarInstance)
    }

    const setSkeleton = (skeletonNo: number) => {
        const blueprint = allAvatarBlueprints[skeletonNo]
        setAvatarBlueprint(blueprint)

        const instance = makeAvatarInstance(blueprint)
        setAvatarInstance(instance)
    }

    const setAnimation = (animationNo: number) => {
        // 이거 잘못된거. instance에 anis가 있어야겠다
        const updateFemaleAvatarInstance = {
            ...avatarInstance,
            currentAnimation:maleAvatarBlueprint.skeleton.animations[animationNo]
        }

        console.log('animations[animationNo]',maleAvatarBlueprint.skeleton.animations[animationNo])
        console.log(updateFemaleAvatarInstance)

        setAvatarInstance(updateFemaleAvatarInstance)
    }

    const context = {
        avatarInstance,
        rootRef,
        setBody,
        setAnimation,
        setSkeleton
    }

    return <AvatarContext.Provider value={context}>{children}</AvatarContext.Provider>
}

export const useAvatar = (): AvatarContextValue => useContext(AvatarContext)
