import styled from '@emotion/styled'
import { useAvatar } from './AvatarContext'
import { allAvatarBlueprints } from './blueprints'

export function AvatarSelector() {
    const {
        setBody,
        setBlueprint,
        setCurrentAnimation,
        blueprint,
        setFace,
        setFoot,
        setGlass,
        setHair,
        setHand,
        setLeg
    } = useAvatar()

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
                <ChangeButton onClick={() => setBody(blueprint.bodies[3])}>Body4</ChangeButton>
                <ChangeButton onClick={() => setBody(blueprint.bodies[4])}>Body5</ChangeButton>
                <ChangeButton onClick={() => setBody(blueprint.bodies[5])}>Body6</ChangeButton>
                <ChangeButton onClick={() => setBody(blueprint.bodies[6])}>Body7</ChangeButton>
                <ChangeButton onClick={() => setBody(blueprint.bodies[7])}>Body8</ChangeButton>
                <ChangeButton onClick={() => setBody(blueprint.bodies[8])}>Body9</ChangeButton>
                <ChangeButton onClick={() => setBody(blueprint.bodies[9])}>Body10</ChangeButton>
                <ChangeButton onClick={() => setBody(blueprint.bodies[10])}>Body11</ChangeButton>
                <ChangeButton onClick={() => setBody(blueprint.bodies[11])}>Body12</ChangeButton>
            </Container>
            <Container>
                <ChangeButton onClick={() => setFace(blueprint.faces[0])}>Face1</ChangeButton>
                <ChangeButton onClick={() => setFace(blueprint.faces[1])}>Face2</ChangeButton>
            </Container>
            <Container>
                <ChangeButton onClick={() => setFoot(blueprint.feet[0])}>Foot1</ChangeButton>
                <ChangeButton onClick={() => setFoot(blueprint.feet[1])}>Foot2</ChangeButton>
                <ChangeButton onClick={() => setFoot(blueprint.feet[2])}>Foot3</ChangeButton>
                <ChangeButton onClick={() => setFoot(blueprint.feet[3])}>Foot4</ChangeButton>
                <ChangeButton onClick={() => setFoot(blueprint.feet[4])}>Foot5</ChangeButton>
                <ChangeButton onClick={() => setFoot(blueprint.feet[5])}>Foot6</ChangeButton>
                <ChangeButton onClick={() => setFoot(blueprint.feet[6])}>Foot7</ChangeButton>
            </Container>
            <Container>
                <ChangeButton onClick={() => setGlass(blueprint.glasses[0])}>Glass1</ChangeButton>
                <ChangeButton onClick={() => setGlass(blueprint.glasses[1])}>Glass2</ChangeButton>
                <ChangeButton onClick={() => setGlass(blueprint.glasses[2])}>Glass3</ChangeButton>
            </Container>
            <Container>
                <ChangeButton onClick={() => setHair(blueprint.hairs[0])}>hair1</ChangeButton>
                <ChangeButton onClick={() => setHair(blueprint.hairs[1])}>hair2</ChangeButton>
                <ChangeButton onClick={() => setHair(blueprint.hairs[2])}>hair3</ChangeButton>
                <ChangeButton onClick={() => setHair(blueprint.hairs[3])}>hair4</ChangeButton>
                <ChangeButton onClick={() => setHair(blueprint.hairs[4])}>hair5</ChangeButton>
            </Container>
            <Container>
                <ChangeButton onClick={() => setHand(blueprint.hands[0])}>hand1</ChangeButton>
                <ChangeButton onClick={() => setHand(blueprint.hands[1])}>hand2</ChangeButton>
            </Container>
            <Container>
                <ChangeButton onClick={() => setLeg(blueprint.legs[0])}>leg1</ChangeButton>
                <ChangeButton onClick={() => setLeg(blueprint.legs[1])}>leg2</ChangeButton>
                <ChangeButton onClick={() => setLeg(blueprint.legs[2])}>leg3</ChangeButton>
                <ChangeButton onClick={() => setLeg(blueprint.legs[3])}>leg4</ChangeButton>
                <ChangeButton onClick={() => setLeg(blueprint.legs[4])}>leg5</ChangeButton>
                <ChangeButton onClick={() => setLeg(blueprint.legs[5])}>leg6</ChangeButton>
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
