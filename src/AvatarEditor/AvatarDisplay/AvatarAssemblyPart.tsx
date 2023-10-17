import { useGLTF } from '@react-three/drei'
import { SkinnedMesh } from 'three'
import { AvatarPart, AvatarPartName, GLTFResult } from '../types'

export interface AvatarParts {
    Hair: AvatarPart | undefined
    Face: AvatarPart | undefined
    Body: AvatarPart | undefined
    Leg: AvatarPart | undefined
    Foot: AvatarPart | undefined
    Hand: AvatarPart | undefined
    Glasses: AvatarPart | undefined
}

interface Props {
    parts: AvatarParts
    name: AvatarPartName
    skeletonNodes: Record<string, SkinnedMesh>
}

export function AvatarAssemblyPart({ name, skeletonNodes, parts }: Props) {
    const part = parts[name]
    const partUrl = part?.fileUrl

    const { nodes, materials } = useGLTF(partUrl || []) as GLTFResult

    if (!nodes || !materials) return <group />

    return (
        <skinnedMesh
            key={nodes[name].uuid}
            name={name}
            geometry={nodes[name].geometry}
            material={materials[name]}
            skeleton={skeletonNodes[name].skeleton}
        />
    )
}
