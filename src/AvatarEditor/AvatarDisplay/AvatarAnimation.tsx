import { useFrame } from '@react-three/fiber'
import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import { AnimationClip, AnimationMixer, Group } from 'three'

interface Props {
    rootRef: MutableRefObject<Group | null>
    currentAnimation: string
    animations: AnimationClip[]
}

export function AvatarAnimation({ rootRef, currentAnimation, animations }: Props) {
    const [mixer, setMixer] = useState<AnimationMixer | null>(null)

    const initializeMixer = useCallback(() => {
        const root = rootRef.current

        if (!root) return

        const newMixer = new AnimationMixer(root)
        setMixer(newMixer)

        return () => {
            newMixer.stopAllAction()
            newMixer.uncacheRoot(root)
        }
    }, [rootRef])

    useEffect(initializeMixer, [initializeMixer])

    const playCurrentAnimation = useCallback(() => {
        if (!mixer) return

        const clip = AnimationClip.findByName(animations, currentAnimation)

        if (clip) {
            mixer.stopAllAction()

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

    useEffect(playCurrentAnimation, [playCurrentAnimation])

    useFrame((state, delta) => {
        mixer && mixer.update(delta)
    })

    return <group />
}
