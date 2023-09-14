import { useGLTF } from '@react-three/drei'
import { useAvatar } from '../contexts/AvatarContext'
import AnimationsControl from './AnimationsControls'
import Part, { GLTFResult } from './Part'

export default function Avatar() {
    const { root } = useAvatar()
    const { nodes, animations } = useGLTF(root.url) as GLTFResult

    return (
        <group>
            <group name="Scene">
                <group name="Armature" ref={root.ref} position={[0, 0, 0]}>
                    <primitive object={nodes.Hips} />
                    {root.animation && <AnimationsControl animations={animations} />}
                    <Part name={'Hair'} rootNodes={nodes} />
                    <Part name={'Face'} rootNodes={nodes} />
                    <Part name={'Body'} rootNodes={nodes} />
                    <Part name={'Leg'} rootNodes={nodes} />
                    <Part name={'Hand'} rootNodes={nodes} />
                    <Part name={'Foot'} rootNodes={nodes} />
                    <Part name={'Glass'} rootNodes={nodes} />
                </group>
            </group>
        </group>
    )
}
