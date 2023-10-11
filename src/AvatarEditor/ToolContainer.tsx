import styled from '@emotion/styled'
import { useAvatar } from './contexts/AvatarContext'
import { allAvatarBlueprints } from './blueprints'

export function ToolContainer() {
    const { setBody, setBlueprint, setCurrentAnimation, blueprint } = useAvatar()

    return (
        <div>
            <Container>
                <ChangeButton onClick={() => setBlueprint(allAvatarBlueprints[0])}>Female</ChangeButton>
                <ChangeButton onClick={() => setBlueprint(allAvatarBlueprints[1])}>Male</ChangeButton>
            </Container>
            <Container>
                <ChangeButton onClick={() => setCurrentAnimation('Idle')}>Idle</ChangeButton>
                <ChangeButton onClick={() => setCurrentAnimation('Walking')}>Walking</ChangeButton>
                <ChangeButton onClick={() => setCurrentAnimation('Running')}>Running</ChangeButton>
            </Container>
            <Container>
                <ChangeButton onClick={() => setBody(blueprint.bodies[0])}>Body1</ChangeButton>
                <ChangeButton onClick={() => setBody(blueprint.bodies[1])}>Body2</ChangeButton>
                <ChangeButton onClick={() => setBody(blueprint.bodies[2])}>Body3</ChangeButton>
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
