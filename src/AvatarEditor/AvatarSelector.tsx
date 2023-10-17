import styled from '@emotion/styled'
import { useAvatar } from './AvatarContext'
import { allAvatarBlueprints } from './blueprints'
import { avatarAnimations } from './types'

export function AvatarSelector() {
    const {
        blueprint,
        setBlueprint,
        setBody,
        setFace,
        setFoot,
        setGlasses,
        setHair,
        setLeg,
        setCurrentAnimation
    } = useAvatar()

    return (
        <div>
            <Container>
                Animations:
                <select onChange={(event) => setCurrentAnimation(event.target.value)}>
                    {avatarAnimations.map((animation, index) => (
                        <option key={index} value={animation}>
                            {animation}
                        </option>
                    ))}
                </select>
            </Container>

            <Container>
                Parts:
                <SelectComponent
                    options={allAvatarBlueprints.map((blueprint) => blueprint.skeleton)}
                    onChange={(event) => setBlueprint(allAvatarBlueprints[parseInt(event.target.value)])}
                />
                <SelectComponent
                    options={blueprint.bodies}
                    onChange={(event) => setBody(blueprint.bodies[parseInt(event.target.value)])}
                />
                <SelectComponent
                    options={blueprint.faces}
                    onChange={(event) => setFace(blueprint.faces[parseInt(event.target.value)])}
                />
                <SelectComponent
                    options={blueprint.feet}
                    onChange={(event) => setFoot(blueprint.feet[parseInt(event.target.value)])}
                />
                <SelectComponent
                    options={blueprint.glasses}
                    onChange={(event) => setGlasses(blueprint.glasses[parseInt(event.target.value)])}
                />
                <SelectComponent
                    options={blueprint.hairs}
                    onChange={(event) => setHair(blueprint.hairs[parseInt(event.target.value)])}
                />
                <SelectComponent
                    options={blueprint.legs}
                    onChange={(event) => setLeg(blueprint.legs[parseInt(event.target.value)])}
                />
            </Container>
        </div>
    )
}

interface SelectComponentProps {
    options: { name: string }[]
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectComponent: React.FC<SelectComponentProps> = ({ options, onChange }) => (
    <select onChange={onChange}>
        {options.map((option, index) => (
            <option key={index} value={index}>
                {option.name}
            </option>
        ))}
    </select>
)

const Container = styled.div`
    display: flex;
`
