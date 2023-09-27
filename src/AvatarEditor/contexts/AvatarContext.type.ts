import { MutableRefObject } from 'react'
import { Group } from 'three'

export interface AvatarContextValue {
    avatarInstance: AvatarInstance
    rootRef: MutableRefObject<Group | null>
    setBody: (bodyNo: number) => void
    setSkeleton: (bodyNo: number) => void
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
