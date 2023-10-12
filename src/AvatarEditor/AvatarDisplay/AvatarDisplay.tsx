import styled from '@emotion/styled'
import { useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Group } from 'three'
import { useAvatar } from '../AvatarContext'
import { GLTFResult } from '../types'
import { AvatarAnimation } from './AvatarAnimation'
import { AvatarAssembly } from './AvatarAssembly'
import { AvatarControls } from './AvatarControls'
import { AvatarExporter, AvatarExporterHandles } from './AvatarExporter'
import Light from './Light'

export type AvatarDisplayHandles = AvatarExporterHandles

export const AvatarDisplay = forwardRef<AvatarExporterHandles, {}>((props, ref) => {
    const rootRef = useRef<Group>(null)
    const exporterRef = useRef<AvatarExporterHandles | null>(null)

    const { currentAnimation, blueprint, ...parts } = useAvatar()
    const { nodes, animations } = useGLTF(blueprint.skeleton.fileUrl) as GLTFResult

    useImperativeHandle(ref, () => ({
        exportAvatar: async (): Promise<ArrayBuffer | undefined> => {
            return exporterRef.current?.exportAvatar()
        },
        getSnapshot: (): string | undefined => {
            return exporterRef.current?.getSnapshot()
        }
    }))

    return (
        <StyledCanvas
            gl={{
                antialias: true,
                preserveDrawingBuffer: true,
                alpha: true
            }}
        >
            <AvatarControls>
                <AvatarAssembly skeletonNodes={nodes} rootRef={rootRef} parts={parts} />
                <Light />
            </AvatarControls>
            <AvatarAnimation rootRef={rootRef} currentAnimation={currentAnimation} animations={animations} />
            <AvatarExporter rootRef={rootRef} animations={animations} ref={exporterRef} />
        </StyledCanvas>
    )
})

const StyledCanvas = styled(Canvas)`
    width: 100%;
    height: 100%;
`
