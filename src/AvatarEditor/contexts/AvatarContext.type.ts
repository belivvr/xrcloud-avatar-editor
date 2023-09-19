import { MutableRefObject } from 'react'
import { Group } from 'three'

export interface AvatarContextValue {
    avatarInstance: AvatarInstance
    rootRef: MutableRefObject<Group | null>
    setBody: (bodyNo: number) => void
}

export interface Part {
    fileUrl: string
}

export interface AvatarBlueprint {
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

export type PartName = 'Hair' | 'Face' | 'Body' | 'Leg' | 'Foot' | 'Hand' | 'Glass'

export interface AvatarInstance {
    currentAnimation: string // 현재 적용된 애니메이션
    skeleton: AvatarSkeleton // 사용된 뼈대 정보
    parts: Record<PartName, Part | undefined>
}
