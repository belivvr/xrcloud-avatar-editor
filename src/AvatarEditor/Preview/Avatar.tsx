import { BufferGeometry, MeshStandardMaterial, NormalBufferAttributes, Skeleton, SkinnedMesh } from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useAvatar } from '../contexts/AvatarContext'
import Part from './Part'
import FixedPart from './FixedPart'
import AnimationsControl from './AnimationsControls'

export type PartProps = {
    nodes: Record<string, SkinnedMesh>
    materials: Record<string, MeshStandardMaterial>
}

export type GLTFResult = GLTF & PartProps

export interface PartData {
    geometry?: BufferGeometry
    material?: MeshStandardMaterial
    skeleton: Skeleton
}


function makeRoot({ nodes, materials, name }: PartProps & { name: string }) {
    const geometry = nodes[name].geometry
    const material = materials[`Material_${name}`]
    const skeleton = nodes[name].skeleton

    // type RootData = {
    //     geometry: BufferGeometry<NormalBufferAttributes>
    //     material: MeshStandardMaterial
    //     skeleton: Skeleton
    // }

    const root = {
        geometry,
        material,
        skeleton
    }

    return root
}

export function Hair({ nodes, materials }: PartProps) {
    const name = 'Hair'
    const root = makeRoot({ nodes, materials, name })
    return <Part name={name} root={root} />
}

export function Face({ nodes, materials }: PartProps) {
    const name = 'Face'
    const root = makeRoot({ nodes, materials, name })
    return <Part name={name} root={root} />
}

export function Body({ nodes, materials }: PartProps) {
    const name = 'Body'
    const root = makeRoot({ nodes, materials, name })

    return <Part name={name} root={root} />
}

export function Leg({ nodes, materials }: PartProps) {
    const name = 'Leg'
    const root = makeRoot({ nodes, materials, name })
    return <Part name={name} root={root} />
}

export function Glass({ nodes, materials }: PartProps) {
    const name = 'Glass'
    const root = makeRoot({ nodes, materials, name })

    return <Part name={name} root={root} />
}

export function Hand({ nodes, materials }: PartProps) {
    const name = 'Hand'
    const root = makeRoot({ nodes, materials, name })

    return <FixedPart name={name} root={root} />
}

export function Foot({ nodes, materials }: PartProps) {
    const name = 'Foot'
    const root = makeRoot({ nodes, materials, name })

    return <FixedPart name={name} root={root} />
}

export default function Avatar() {
    const { root, current } = useAvatar()
    const { nodes: rootNodes, materials: rootMaterial, animations } = useGLTF(root.url) as GLTFResult

    return (
        <group>
            <group name="Scene">
                <group name="Armature" ref={root.ref} position={[0, 0, 0]}>
                    <primitive object={rootNodes.Hips} />
                    {root.animation && <AnimationsControl animations={animations} />}
                    <Hair nodes={rootNodes} materials={rootMaterial} />
                    <Face nodes={rootNodes} materials={rootMaterial} />
                    <Body nodes={rootNodes} materials={rootMaterial} />
                    <Leg nodes={rootNodes} materials={rootMaterial} />
                    {current['Glass'] ? (
                        <Glass nodes={rootNodes} materials={rootMaterial} />
                    ) : (
                        <group name={'Glass'} />
                    )}
                    <Hand nodes={rootNodes} materials={rootMaterial} />
                    <Foot nodes={rootNodes} materials={rootMaterial} />
                </group>
            </group>
        </group>
    )
}
