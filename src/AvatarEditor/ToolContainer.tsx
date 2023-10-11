import styled from '@emotion/styled'
import { useAvatar } from './contexts/AvatarContext'

export function ToolContainer() {
    const { setBody, setSkeleton, setCurrentAnimation } = useAvatar()

    return (
        <div>
            <Container>
                <ChangeButton onClick={() => setSkeleton(0)}>Skeleton1</ChangeButton>
                <ChangeButton onClick={() => setSkeleton(1)}>Skeleton2</ChangeButton>
            </Container>
            <Container>
                <ChangeButton onClick={() => setCurrentAnimation('Running')}>Running</ChangeButton>
                <ChangeButton onClick={() => setCurrentAnimation('Walking')}>Walking</ChangeButton>
                <ChangeButton onClick={() => setCurrentAnimation('Idle')}>Idle</ChangeButton>
            </Container>
            <Container>
                <ChangeButton onClick={() => setBody(0)}>Body1</ChangeButton>
                <ChangeButton onClick={() => setBody(1)}>Body2</ChangeButton>
                <ChangeButton onClick={() => setBody(2)}>Body3</ChangeButton>
            </Container>
        </div>
    )
}

const ChangeButton = styled.div`
    width: 100px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Container = styled.div`
    display: flex;
`
