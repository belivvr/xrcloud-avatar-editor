import { OrbitControls } from '@react-three/drei'
import { RefObject, useCallback, useRef, useState } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

type Props = {
    children: React.ReactNode
}

export function AvatarControls({ children }: Props) {
    const controlsRef = useRef<OrbitControlsImpl>(null)
    const orbitControlsRef: RefObject<OrbitControlsImpl> = controlsRef

    const minDistance = 0.5
    const maxDistance = 1.5

    const modelHeightMax = -1.2
    const modelHeightMin = -1.7
    const [modelHeight, setModelHeight] = useState<number>(modelHeightMax)

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
        <group position={[0, modelHeight, 0]}>
            {children}

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
        </group>
    )
}
