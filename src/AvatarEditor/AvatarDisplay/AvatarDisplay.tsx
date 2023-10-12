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

export const AvatarDisplay = forwardRef<AvatarExporterHandles, {}>((props, ref) => {
    const rootRef = useRef<Group>(null)

    const { currentAnimation, blueprint, ...parts } = useAvatar()
    const { nodes, animations } = useGLTF(blueprint.skeleton.fileUrl) as GLTFResult

    // useEffect(() => {
    //     loopThroughBlueprint(blueprint, (item) => {
    //         useGLTF.preload(item.fileUrl)
    //     })
    // }, [blueprint])
    const displayRef = useRef<AvatarExporterHandles | null>(null)

    useImperativeHandle(ref, () => ({
        exportAvatar: async (): Promise<ArrayBuffer | undefined> => {
            return displayRef.current?.exportAvatar()
        },
        getSnapshot: (width: number, height: number): string | undefined => {
            return displayRef.current?.getSnapshot(width,height)
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
            <AvatarExporter rootRef={rootRef} animations={animations} ref={displayRef} />
        </StyledCanvas>
    )
})

const StyledCanvas = styled(Canvas)`
    width: 100%;
    height: 100%;
`
