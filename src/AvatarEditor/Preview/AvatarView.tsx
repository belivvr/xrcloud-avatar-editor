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
    const { nodes, animations } = useGLTF(avatarInstance.skeleton.fileUrl) as GLTFResult
    const [mixer, setMixer] = useState<AnimationMixer | null>(null)

    useEffect(() => {
        const root = rootRef.current
        let mixer: AnimationMixer | null = null

        if (root) {
            mixer = new AnimationMixer(root)
            setMixer(mixer)
            // console.log(rootRef.current?.children)
        }

        // return () => {
        //     if (mixer && root) {
        //         mixer.stopAllAction()
        //         mixer.uncacheRoot(root)
        //     }
        // }
    }, [rootRef, avatarInstance.skeleton.fileUrl])

    useEffect(() => {
        let clip: AnimationClip | null = null

        if (mixer) {
            mixer.stopAllAction()

            clip = AnimationClip.findByName(animations, avatarInstance.currentAnimation)
            const action = mixer.clipAction(clip)
            action.play()
        }

        // return () => {
        // if (clip && mixer) {
        // mixer.uncacheClip(clip)
        // console.log('Release Clip')
        // }
        // }
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
                    <PartView name={'Hair'} rootNodes={nodes} />
                    <PartView name={'Face'} rootNodes={nodes} />
                    <PartView name={'Body'} rootNodes={nodes} />
                    <PartView name={'Leg'} rootNodes={nodes} />
                    <PartView name={'Hand'} rootNodes={nodes} />
                    <PartView name={'Foot'} rootNodes={nodes} />
                    <PartView name={'Glass'} rootNodes={nodes} />
                    <primitive key={avatarInstance.skeleton.fileUrl} object={nodes.Hips} />
                </group>
            </group>
        </group>
    )
}
