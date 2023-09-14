import { MutableRefObject } from 'react'
import { Group } from 'three'

export interface AvatarContextValue {
    root: Root
    parts?: PartOld
    current: Current
}

export interface Root {
    url: string
    animation?: string
    ref: MutableRefObject<Group>
}

export interface RootOptions {
    url: string
    animation?: string | 'Walking' | 'Idle'
}

export type PartOld = Record<string, PartValue>

interface PartValue {
    defaultResource?: string
    resources?: Resource[]
}

export interface Resource {
    id: string
    fileUrl: string
}

export type Current = Record<string, Resource | null>

export interface Part {
    fileUrl: string
}

export interface DefaultParts {
    hair?: Part
    face?: Part
    body?: Part
    leg?: Part
    foot?: Part
    hand?: Part
    glass?: Part
}

export interface AvatarBlueprint {
    defaultParts: DefaultParts
    skeleton: AvatarSkeleton
    hairs: Part[]
    faces: Part[]
    bodies: Part[]
    legs: Part[]
    feet: Part[]
    hands: Part[]
    glasses: Part[]
}

export interface AvatarSkeleton {
    fileUrl: string
    animations: string[]
}

export interface AvatarInstance {
    currentAnimation: string // 현재 적용된 애니메이션
    skeleton: AvatarSkeleton // 사용된 뼈대 정보
    parts: {
        hair: Part
        face: Part
        body: Part
        leg: Part
        foot: Part
        hand: Part
        glass: Part
    }
}
