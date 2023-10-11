import { useGLTF } from '@react-three/drei'
import React, { MutableRefObject, ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { AnimationClip, Group, SkinnedMesh } from 'three'
import { allAvatarBlueprints, loopThroughBlueprint } from '../blueprints'
import { GLTFResult } from '../Preview/PartView'

export interface AvatarContextValue {
    // rootNodes: Record<string, SkinnedMesh>
    // animations:AnimationClip[]
    blueprint: AvatarBlueprint
    currentAnimation: string
    parts: AvatarParts
    rootRef: MutableRefObject<Group | null>
    setHair: (body: AvatarPart) => void
    setFace: (body: AvatarPart) => void
    setBody: (body: AvatarPart) => void
    setLeg: (body: AvatarPart) => void
    setFoot: (body: AvatarPart) => void
    setHand: (body: AvatarPart) => void
    setGlass: (body: AvatarPart) => void
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

    const setHair = (part: AvatarPart) => {
        const newParts = {
            ...parts,
            Hair: part
        }

        setAvatarParts(newParts)
    }

    const setFace = (part: AvatarPart) => {
        const newParts = {
            ...parts,
            Face: part
        }

        setAvatarParts(newParts)
    }

    const setBody = (body: AvatarPart) => {
        const newParts = {
            ...parts,
            Body: body
        }

        setAvatarParts(newParts)
    }

    const setLeg = (part: AvatarPart) => {
        const newParts = {
            ...parts,
            Leg: part
        }

        setAvatarParts(newParts)
    }

    const setFoot = (part: AvatarPart) => {
        const newParts = {
            ...parts,
            Foot: part
        }

        setAvatarParts(newParts)
    }

    const setHand = (part: AvatarPart) => {
        const newParts = {
            ...parts,
            Hand: part
        }

        setAvatarParts(newParts)
    }

    const setGlass = (part: AvatarPart) => {
        const newParts = {
            ...parts,
            Glass: part
        }

        setAvatarParts(newParts)
    }

    // export type AvatarPartName = 'Hair' | 'Face' | 'Body' | 'Leg' | 'Foot' | 'Hand' | 'Glass'

    // console.log(blueprint.skeleton.fileUrl)
    // useGLTF(blueprint.skeleton.fileUrl) as GLTFResult

    const context = {
        // rootNodes,
        // animations,
        parts,
        rootRef,
        currentAnimation,
        blueprint,
        setHair,
        setFace,
        setBody,
        setLeg,
        setFoot,
        setHand,
        setGlass,
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
