import styled from '@emotion/styled'
import PartsEditor from './PartsEditor'
import ExportButton from './ExportButton'
import SelectType from './SelectType'

export default function ToolBox() {
  return (
    <Container>
      <SelectType />
      <PartsEditor />
      <ButtonNav>
        <ExportButton />
      </ButtonNav>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`

const ButtonNav = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem;
  margin-top: auto;
  flex: none;
  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    background: white;
    padding: 0.5rem;
  }
`
