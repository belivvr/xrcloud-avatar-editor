import { useGLTF } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { BufferGeometry, MeshStandardMaterial, Skeleton, SkinnedMesh } from 'three'
import { GLTF } from 'three-stdlib'
import { useAvatar } from '../contexts/AvatarContext'
import { AvatarPartName } from '../contexts/AvatarContext.type'

export interface PartData {
    geometry?: BufferGeometry
    material?: MeshStandardMaterial
    skeleton?: Skeleton
}

export type PartProps = {
    nodes: Record<string, SkinnedMesh>
    materials: Record<string, MeshStandardMaterial>
}

export type GLTFResult = GLTF & PartProps

interface Props {
    name: AvatarPartName
    rootNodes: Record<string, SkinnedMesh>
}

export function PartView({ name, rootNodes }: Props) {
    const [data, setData] = useState<PartData>({})

    const { avatarInstance } = useAvatar()

    const part = avatarInstance.parts[name]
    const { nodes, materials } = useGLTF(part ? part.fileUrl : []) as GLTFResult

    useEffect(() => {
        if (nodes && materials) {
            setData({
                geometry: nodes[name].geometry,
                material: materials[Object.keys(materials)[0]],
                skeleton: rootNodes[name].skeleton
            })
        }
    }, [materials, name, nodes, rootNodes])

    if (data.geometry && data.material && data.skeleton) {
        return (
            <skinnedMesh
                name={name}
                geometry={data.geometry}
                material={data.material}
                skeleton={data.skeleton}
            />
        )
    } else {
        return <group />
    }
}
