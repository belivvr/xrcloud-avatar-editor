import { useGLTF } from '@react-three/drei'
import React, { MutableRefObject, ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { Group } from 'three'
import { allAvatarBlueprints, loopThroughBlueprint } from '../blueprints'

export interface AvatarContextValue {
    skeleton: AvatarSkeleton
    currentAnimation: string
    parts: AvatarParts
    rootRef: MutableRefObject<Group | null>
    setBody: (bodyNo: number) => void
    setSkeleton: (skeletonNo: number) => void
    setCurrentAnimation: (clipName: string) => void
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

export type AvatarParts = Record<AvatarPartName, AvatarPart | undefined>

export const AvatarContext = React.createContext({} as AvatarContextValue)

//  리팩토링 하다가 말았다
export function AvatarProvider({ children }: { children: ReactNode }) {
    const rootRef = useRef<Group>(null)
    const [avatarBlueprint, setAvatarBlueprint] = useState<AvatarBlueprint>(allAvatarBlueprints[0])
    const [parts, setAvatarParts] = useState<AvatarParts>(makeAvatarInstance(avatarBlueprint))
    const [skeleton, setAvatarSkeleton] = useState<AvatarSkeleton>(avatarBlueprint.skeleton)
    const [currentAnimation, setCurrentAnimation] = useState<string>('Idle')

    useEffect(() => {
        loopThroughBlueprint(avatarBlueprint, (item) => {
            useGLTF.preload(item.fileUrl)
        })
    }, [avatarBlueprint])

    const setBody = (bodyNo: number) => {
        const newParts = {
            ...parts,
            Body: avatarBlueprint.bodies[bodyNo]
        }

        setAvatarParts(newParts)
    }

    const setSkeleton = (skeletonNo: number) => {
        const blueprint = allAvatarBlueprints[skeletonNo]

        setAvatarBlueprint(blueprint)
        setAvatarSkeleton(blueprint.skeleton)

        const instance = makeAvatarInstance(blueprint)

        setAvatarParts(instance)
    }

    const context = {
        parts,
        rootRef,
        skeleton,
        currentAnimation,
        setBody,
        setCurrentAnimation,
        setSkeleton
    }

    return <AvatarContext.Provider value={context}>{children}</AvatarContext.Provider>
}

export const useAvatar = (): AvatarContextValue => useContext(AvatarContext)

function makeAvatarInstance(blueprint: AvatarBlueprint): AvatarParts {
    return {
        Hair: blueprint.hairs[0],
        Face: blueprint.faces[0],
        Body: blueprint.bodies[0],
        Leg: blueprint.legs[0],
        Foot: blueprint.feet[0],
        Hand: blueprint.hands[0],
        Glass: undefined
    }
}
