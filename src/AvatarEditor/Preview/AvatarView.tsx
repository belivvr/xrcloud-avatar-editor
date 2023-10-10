import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { AnimationMixer, AnimationClip } from 'three'
import { useAvatar } from '../contexts/AvatarContext'
import { GLTFResult, PartView } from './PartView'
/**
 * 몇 번씩 로드하면 undefined 오류나는 문제가 있음
 * male/legs/leg-01.glb은 animation을 제외한 것으로 보인다. 크기가 많이 줄어든다.
 */
export function AvatarView() {
    const { avatarInstance, rootRef } = useAvatar()
    const { nodes:rootNodes, animations } = useGLTF(avatarInstance.skeleton.fileUrl) as GLTFResult
    const [mixer, setMixer] = useState<AnimationMixer | null>(null)

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
    }, [rootRef, avatarInstance.skeleton.fileUrl])

    useEffect(() => {
        let clip: AnimationClip | null = null

        if (mixer) {
            mixer.stopAllAction()

            clip = AnimationClip.findByName(animations, avatarInstance.currentAnimation)

            if (clip) {
                mixer.clipAction(clip).play()
            }else{
                alert(`The '${avatarInstance.currentAnimation}' does not exist.`)
            }
        }

        return () => {
            if (clip && mixer) {
                mixer.stopAllAction()
                mixer.uncacheClip(clip)
            }
        }
    }, [animations, avatarInstance.currentAnimation, mixer])

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
                    <primitive key={avatarInstance.skeleton.fileUrl} object={rootNodes.Hips} />
                </group>
            </group>
        </group>
    )
}
