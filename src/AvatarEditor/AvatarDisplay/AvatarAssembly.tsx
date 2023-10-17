import { MutableRefObject } from 'react'
import { Group, SkinnedMesh } from 'three'
import {  avatarPartNames } from '../types'
import { AvatarAssemblyPart, AvatarParts } from './AvatarAssemblyPart'

interface Props {
    parts: AvatarParts
    rootRef: MutableRefObject<Group | null>
    skeletonNodes: Record<string, SkinnedMesh>
}

export function AvatarAssembly({ rootRef, skeletonNodes, parts }: Props) {
    return (
        <group name="Scene">
            <group name="Armature" ref={rootRef} position={[0, 0, 0]}>
                {avatarPartNames.map((name) => (
                    <AvatarAssemblyPart key={name} name={name} parts={parts} skeletonNodes={skeletonNodes} />
                ))}
                <primitive key={skeletonNodes.Hips.uuid} object={skeletonNodes.Hips} />
            </group>
        </group>
    )
}
