import { useGLTF } from '@react-three/drei'
import React, { MutableRefObject, ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { Group } from 'three'
import { allAvatarBlueprints, loopThroughBlueprint } from '../blueprints'

export interface AvatarContextValue {
    blueprint: AvatarBlueprint
    currentAnimation: string
    parts: AvatarParts
    rootRef: MutableRefObject<Group | null>
    setBody: (body: AvatarPart) => void
    setBlueprint: (blueprint: AvatarBlueprint) => void
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

export function AvatarProvider({ children }: { children: ReactNode }) {
    const rootRef = useRef<Group>(null)
    const [blueprint, setBlueprint] = useState<AvatarBlueprint>(allAvatarBlueprints[0])
    const [parts, setAvatarParts] = useState<AvatarParts>(makeAvatarInstance(blueprint))
    const [currentAnimation, setCurrentAnimation] = useState<string>('Idle')

    useEffect(() => {
        const instance = makeAvatarInstance(blueprint)

        setAvatarParts(instance)

        loopThroughBlueprint(blueprint, (item) => {
            useGLTF.preload(item.fileUrl)
        })
    }, [blueprint])

    const setBody = (body: AvatarPart) => {
        const newParts = {
            ...parts,
            Body: body
        }

        setAvatarParts(newParts)
    }

    const context = {
        parts,
        rootRef,
        currentAnimation,
        blueprint,
        setBody,
        setCurrentAnimation,
        setBlueprint
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
