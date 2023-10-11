import { useRef } from 'react'
import { Group } from 'three'

export default function Light() {
    const ref = useRef<Group>(null!)

    return (
        <group ref={ref}>
            <ambientLight intensity={0.6} position={[0, 2, 1]} />
            <directionalLight intensity={0.6} position={[0, 2, 1]} />
        </group>
    )
}
