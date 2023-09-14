import { MutableRefObject } from 'react'
import { Group } from 'three'

export interface AvatarContextValue {
    root: Root
    parts?: Part
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

export type Part = Record<string, PartValue>

interface PartValue {
    defaultResource?: string
    resources?: Resource[]
}

export interface Resource {
    id: string
    fileUrl: string
}

export type Current = Record<string, Resource | null>
