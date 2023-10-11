import styled from '@emotion/styled'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { AvatarDisplay } from './AvatarDisplay'
import { AvatarProvider } from './AvatarContext'
import { AvatarSelector } from './AvatarSelector'

export function AvatarEditor() {
    return (
        <AvatarProvider>
            <CanvasFrame>
                <Suspense fallback={<p>로딩중...</p>}>
                    <StyledCanvas>
                        <AvatarDisplay />
                    </StyledCanvas>
                </Suspense>
            </CanvasFrame>
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
