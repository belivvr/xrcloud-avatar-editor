import { MeshStandardMaterial, SkinnedMesh } from 'three'
import { GLTF } from 'three-stdlib'

export interface AvatarPart {
    name: string
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

export interface AvatarSkeleton extends AvatarPart {}

export const avatarAnimations = [
    'Idle',
    'LeftStrafe',
    'LeftStrafeWalk',
    'RightStrafe',
    'RightStrafeWalk',
    'Running',
    'RunningBackward',
    'Walking',
    'WalkingBackwards'
]
export type AvatarPartName = 'Hair' | 'Face' | 'Body' | 'Leg' | 'Foot' | 'Hand' | 'Glasses'
export const avatarPartNames: AvatarPartName[] = ['Hair', 'Face', 'Body', 'Leg', 'Foot', 'Hand', 'Glasses']

export type AvatarParts = Record<AvatarPartName, AvatarPart | undefined>

export type GLTFResult = GLTF & {
    nodes: Record<string, SkinnedMesh>
    materials: Record<string, MeshStandardMaterial>
}
