import { useGLTF } from '@react-three/drei'
import { SkinnedMesh } from 'three'
import { useAvatar } from '../AvatarContext'
import { AvatarPartName, GLTFResult } from '../types'

interface Props {
    name: AvatarPartName
    rootNodes: Record<string, SkinnedMesh>
}

export function AvatarPart({ name, rootNodes }: Props) {
    const avatar = useAvatar()
    const partFileUrl = avatar[name]?.fileUrl || []
    const { nodes, materials } = useGLTF(partFileUrl) as GLTFResult

    if (!nodes || !materials) return <group />

    return (
        <skinnedMesh
            name={name}
            geometry={nodes[name].geometry}
            material={materials[name]}
            skeleton={rootNodes[name].skeleton}
        />
    )
}
