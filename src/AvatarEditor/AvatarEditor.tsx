import styled from '@emotion/styled'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { AvatarDisplay } from './AvatarDisplay'
import { AvatarProvider } from './AvatarContext'
import { AvatarSelector } from './AvatarSelector'
import { ExportView } from './ExportView'

export function AvatarEditor() {
    return (
        <AvatarProvider>
            <CanvasFrame>
                <Suspense fallback={<p>Loading...</p>}>
                    <StyledCanvas>
                        <AvatarDisplay />
                    </StyledCanvas>
                </Suspense>
            </CanvasFrame>
            <ExportView/>
            <AvatarSelector />
        </AvatarProvider>
    )
}

const CanvasFrame = styled.div`
    width: 400px;
    height: 600px;
`

const StyledCanvas = styled(Canvas)`
    width: 100%;
    height: 100%;
    background: #f8f8f8;
`
