import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { AnimationClip, AnimationMixer } from 'three'
import { useAvatar } from '../contexts/AvatarContext'
import { GLTFResult, PartView } from './PartView'

export function AvatarView() {
    const { currentAnimation, rootRef, blueprint } = useAvatar()
    const [mixer, setMixer] = useState<AnimationMixer | null>(null)

    const { nodes: rootNodes, animations } = useGLTF(blueprint.skeleton.fileUrl) as GLTFResult

    useEffect(() => {
        const root = rootRef.current
        let mixer: AnimationMixer | null = null

        if (root) {
            mixer = new AnimationMixer(root)
            setMixer(mixer)
        }

        return () => {
            if (mixer && root) {
                mixer.stopAllAction()
                mixer.uncacheRoot(root)
            }
        }
    }, [rootRef, blueprint.skeleton.fileUrl])

    useEffect(() => {
        let clip: AnimationClip | null = null

        if (mixer) {
            mixer.stopAllAction()

            clip = AnimationClip.findByName(animations, currentAnimation)

            if (clip) {
                mixer.clipAction(clip).play()
            } else {
                alert(`The '${currentAnimation}' does not exist.`)
            }
        }

        return () => {
            if (clip && mixer) {
                mixer.stopAllAction()
                mixer.uncacheClip(clip)
            }
        }
    }, [animations, currentAnimation, mixer])

    useFrame((state, delta) => {
        if (mixer) {
            mixer.update(delta)
        }
    })

    return (
        <group>
            <group name="Scene">
                <group name="Armature" ref={rootRef} position={[0, 0, 0]}>
                    <PartView name={'Hair'} rootNodes={rootNodes} />
                    <PartView name={'Face'} rootNodes={rootNodes} />
                    <PartView name={'Body'} rootNodes={rootNodes} />
                    <PartView name={'Leg'} rootNodes={rootNodes} />
                    <PartView name={'Hand'} rootNodes={rootNodes} />
                    <PartView name={'Foot'} rootNodes={rootNodes} />
                    <PartView name={'Glass'} rootNodes={rootNodes} />
                    <primitive key={blueprint.skeleton.fileUrl} object={rootNodes.Hips} />
                </group>
            </group>
        </group>
    )
}
