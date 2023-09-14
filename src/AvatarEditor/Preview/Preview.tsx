import { RefObject, useCallback, useRef, useState } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { OrbitControls } from '@react-three/drei'
import Avatar from './Avatar'
import Light from './Light'

const distanceRange = { min: 0.5, max: 1.5 }
const modelHeightRange = { min: -1.7, max: -1.2 }

export function Preview(): JSX.Element {
    const controlsRef = useRef<OrbitControlsImpl>(null)
    const orbitControlsRef: RefObject<OrbitControlsImpl> = controlsRef

    const [modelHeight, setModelHeight] = useState<number>(modelHeightRange.max)

    const handleZoomChange = useCallback(() => {
        if (controlsRef.current) {
            const newModelHeight = getHeightByDistance(controlsRef.current, distanceRange, modelHeightRange)

            setModelHeight(newModelHeight)
        }
    }, [])

    return (
        <group>
            <group position={[0, modelHeight, 0]}>
                <Avatar />
                <Light />
            </group>

            <OrbitControls
                ref={orbitControlsRef}
                minDistance={distanceRange.min}
                maxDistance={distanceRange.max}
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

interface Range {
    min: number
    max: number
}

const getHeightByDistance = (
    controlsRef: OrbitControlsImpl,
    distanceRange: Range,
    heightRange: Range
): number => {
    const {
        object: { position },
        target
    } = controlsRef

    const distance = position.distanceTo(target)
    const distanceRatio = (distance - distanceRange.min) / (distanceRange.max - distanceRange.min)

    return heightRange.min + distanceRatio * (heightRange.max - heightRange.min)
}
