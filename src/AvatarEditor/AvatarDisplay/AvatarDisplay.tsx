import { useState } from 'react'
import { AvatarAssembly } from './AvatarAssembly'
import Light from './Light'
import { AvatarDisplayControls } from './AvatarDisplayControls'

export function AvatarDisplay(): JSX.Element {
    const modelHeightMax = -1.2
    const modelHeightMin = -1.7

    const [modelHeight, setModelHeight] = useState<number>(modelHeightMax)

    return (
        <group>
            <group position={[0, modelHeight, 0]}>
                <AvatarAssembly />
                <Light />
            </group>

            <group>
                <AvatarDisplayControls
                    setModelHeight={setModelHeight}
                    modelHeightMax={modelHeightMax}
                    modelHeightMin={modelHeightMin}
                />
            </group>
        </group>
    )
}
