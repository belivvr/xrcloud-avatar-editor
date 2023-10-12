import { OrbitControls } from '@react-three/drei'
import { RefObject, useCallback, useRef } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

type Props = {
    setModelHeight: (height: number) => void
    modelHeightMax: number
    modelHeightMin: number
}

export function AvatarDisplayControls({ setModelHeight, modelHeightMax, modelHeightMin }: Props) {
    const controlsRef = useRef<OrbitControlsImpl>(null)
    const orbitControlsRef: RefObject<OrbitControlsImpl> = controlsRef

    const minDistance = 0.5
    const maxDistance = 1.5

    const handleZoomChange = useCallback(() => {
        if (controlsRef.current) {
            const {
                object: { position },
                target
            } = controlsRef.current

            const distance = position.distanceTo(target)
            const distanceRatio = (distance - minDistance) / (maxDistance - minDistance)
            const newModelHeight = modelHeightMin + distanceRatio * (modelHeightMax - modelHeightMin)

            setModelHeight(newModelHeight)
        }
    }, [modelHeightMax, modelHeightMin, setModelHeight])

    return (
        <OrbitControls
            ref={orbitControlsRef}
            minDistance={minDistance}
            maxDistance={maxDistance}
            minPolarAngle={0.8}
            maxPolarAngle={2}
            enablePan={false}
            enableDamping
            onChange={handleZoomChange}
            target={[0, -0.3, 0]}
        />
    )
}
