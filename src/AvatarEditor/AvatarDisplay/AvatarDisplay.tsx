import { RefObject, useCallback, useRef, useState } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { OrbitControls } from '@react-three/drei'
import { AvatarAssembly } from './AvatarAssembly'
import Light from './Light'

const minDistance = 0.5
const maxDistance = 1.5
const modelHeightRange = { min: -1.7, max: -1.2 }

export function AvatarDisplay(): JSX.Element {
    const controlsRef = useRef<OrbitControlsImpl>(null)
    const orbitControlsRef: RefObject<OrbitControlsImpl> = controlsRef

    const [modelHeight, setModelHeight] = useState<number>(modelHeightRange.max)

    const handleZoomChange = useCallback(() => {
        if (controlsRef.current) {
            const {
                object: { position },
                target
            } = controlsRef.current

            const distance = position.distanceTo(target)
            const distanceRatio = (distance - minDistance) / (maxDistance - minDistance)
            const newModelHeight =
                modelHeightRange.min + distanceRatio * (modelHeightRange.max - modelHeightRange.min)

            setModelHeight(newModelHeight)
        }
    }, [])

    return (
        <group>
            <group position={[0, modelHeight, 0]}>
                <AvatarAssembly />
                <Light />
            </group>

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
