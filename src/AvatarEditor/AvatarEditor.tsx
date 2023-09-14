import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { AvatarProvider } from './contexts/AvatarContext'
import { Preview } from './Preview'
import styled from '@emotion/styled'

export function AvatarEditor() {
    return (
        <AvatarProvider>
            <CanvasContainer>
                <Suspense fallback={<p>사용자 정보 로딩중...</p>}>
                    <StyledCanvas>
                        <Preview />
                    </StyledCanvas>
                </Suspense>
            </CanvasContainer>
        </AvatarProvider>
    )
}

const CanvasContainer = styled.div`
    width: 400px;
    height: 600px;
`

const StyledCanvas = styled(Canvas)`
    width: 100%;
    height: 100%;
    background: #f8f8f8;
`
