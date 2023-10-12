import { MutableRefObject } from 'react'
import { Group, SkinnedMesh } from 'three'
import { AvatarAssemblyPart, AvatarParts } from './AvatarAssemblyPart'
import { AvatarPartName } from '../types'

interface Props {
    parts: AvatarParts
    rootRef: MutableRefObject<Group | null>
    skeletonNodes: Record<string, SkinnedMesh>
}

export function AvatarAssembly({ rootRef, skeletonNodes, parts }: Props) {
    const partNames: AvatarPartName[] = ['Hair', 'Face', 'Body', 'Leg', 'Foot', 'Hand', 'Glass']

    return (
        <group name="Scene">
            <group name="Armature" ref={rootRef} position={[0, 0, 0]}>
                {partNames.map((name) => (
                    <AvatarAssemblyPart key={name} name={name} parts={parts} skeletonNodes={skeletonNodes} />
                ))}
                <primitive key={skeletonNodes.Hips.uuid} object={skeletonNodes.Hips} />
            </group>
        </group>
    )
}
