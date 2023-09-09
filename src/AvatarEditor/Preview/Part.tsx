import { useGLTF } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { useAvatar } from '../contexts/AvatarContext'
import { GLTFResult, PartData } from './Avatar'

interface Props {
    name: string
    root: PartData
}

export default function Part({ name, root }: Props) {
    const [data, setData] = useState<PartData>({
        skeleton: root.skeleton
    })

    const {
        current: { [name]: currentResource }
    } = useAvatar()

    const { nodes, materials } = useGLTF(currentResource ? currentResource.fileUrl : []) as GLTFResult

    useEffect(() => {
        setData({
            geometry: nodes[name].geometry ?? root.geometry,
            material: materials[Object.keys(materials)[0]] ?? root.material,
            skeleton: root.skeleton
        })
    }, [currentResource, materials, name, nodes, root.geometry, root.material, root.skeleton])

    if (currentResource) {
        return (
            <skinnedMesh
                name={name}
                geometry={data.geometry}
                material={data.material}
                skeleton={data.skeleton}
            />
        )
    } else {
        return (
            <skinnedMesh
                name={name}
                geometry={root.geometry}
                material={root.material}
                skeleton={root.skeleton}
            />
        )
    }
}
