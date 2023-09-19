import styled from '@emotion/styled'
import { useAvatar } from './contexts/AvatarContext'

export function ToolContainer() {
    const { setBody } = useAvatar()

    return (
        <div>
            <ChangeButton onClick={() => setBody(0)}>Body1</ChangeButton>
            <ChangeButton onClick={() => setBody(1)}>Body2</ChangeButton>
        </div>
    )
}

const ChangeButton = styled.div`
    width: 50px;
    height: 30px;
`
