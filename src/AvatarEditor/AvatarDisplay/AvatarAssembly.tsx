import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { AnimationClip, AnimationMixer } from 'three'
import { useAvatar } from '../AvatarContext'
import { AvatarPart } from './AvatarPart'
import { GLTFResult } from '../types'

export function AvatarAssembly() {
    const { currentAnimation, rootRef, blueprint } = useAvatar()
    const [mixer, setMixer] = useState<AnimationMixer | null>(null)

    const { nodes: rootNodes, animations } = useGLTF(blueprint.skeleton.fileUrl) as GLTFResult

    useEffect(() => {
        const root = rootRef.current

        if (!root) return

        const newMixer = new AnimationMixer(root)
        setMixer(newMixer)

        return () => {
            newMixer.stopAllAction()
            newMixer.uncacheRoot(root)
        }
    }, [rootRef, blueprint.skeleton.fileUrl])

    useEffect(() => {
        if (!mixer) return

        const clip = AnimationClip.findByName(animations, currentAnimation)
        mixer.stopAllAction()

        if (clip) {
            const action = mixer.clipAction(clip)
            action.play()
        } else {
            alert(`The '${currentAnimation}' does not exist.`)
        }

        return () => {
            mixer.stopAllAction()
            clip && mixer.uncacheClip(clip)
        }
    }, [animations, currentAnimation, mixer])

    useFrame((state, delta) => {
        mixer && mixer.update(delta)
    })

    return (
        <group>
            <group name="Scene">
                <group name="Armature" ref={rootRef} position={[0, 0, 0]}>
                    <AvatarPart name='Hair' rootNodes={rootNodes} />
                    <AvatarPart name='Face' rootNodes={rootNodes} />
                    <AvatarPart name="Body" rootNodes={rootNodes} />
                    <AvatarPart name='Leg' rootNodes={rootNodes} />
                    <AvatarPart name='Hand' rootNodes={rootNodes} />
                    <AvatarPart name='Foot' rootNodes={rootNodes} />
                    <AvatarPart name='Glass' rootNodes={rootNodes} />
                    <primitive key={blueprint.skeleton.fileUrl} object={rootNodes.Hips} />
                </group>
            </group>
        </group>
    )
}
