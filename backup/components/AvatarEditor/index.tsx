import styled from '@emotion/styled'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { AvatarProvider } from '../../contexts/AvatarContext'
import Preview from '../Preview'
import ToolBox from '../ToolBox'

export default function AvatarEditor() {
  return (
    <AvatarProvider>
      <Layout>
        <CanvasContainer>
          <Suspense fallback={null}>
            <ThreeCanvas>
              <Preview />
            </ThreeCanvas>
          </Suspense>
        </CanvasContainer>
        <ToolContainer>
          <ToolBox />
        </ToolContainer>
      </Layout>
    </AvatarProvider>
  )
}

const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const CanvasContainer = styled.div`
  width: 480px;
  height: 100vh;
  background: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 160px;
    height: 320px;
    margin: 1rem auto;
  }
`

const ThreeCanvas = styled(Canvas)`
  width: 100%;
  height: 100%;
  background: #f8f8f8;
`

const ToolContainer = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`
