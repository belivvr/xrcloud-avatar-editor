import { useFrame } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { AnimationClip, AnimationMixer } from 'three'
import { useAvatar } from '../contexts/AvatarContext'

interface Props {
    animations: AnimationClip[]
}

export default function AnimationsControl({ animations }: Props) {
    const { root } = useAvatar()
    const [mixer, setMixer] = useState<AnimationMixer>(null!)
    useEffect(() => {
        setMixer(new AnimationMixer(root.ref.current))
    }, [root])

    useEffect(() => {
        if (mixer) {
            animations.forEach((clip) => {
                const action = mixer.clipAction(clip)
                if (clip.name && clip.name === root.animation) {
                    const action = mixer.clipAction(clip)
                    action.play()
                }
                action.reset()
            })
        }
    }, [root, animations, mixer])

    useFrame((state, delta) => {
        if (mixer) {
            mixer.update(delta)
        }
    })

    return <></>
}
