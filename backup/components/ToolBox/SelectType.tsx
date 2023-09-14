import styled from '@emotion/styled'
import React from 'react'

export default function SelectType() {
    return (
        <Ul>
            {/* <Li onClick={() => setType(AvatarType.MALE)} active={type === 'male'}>
                <BiMaleSign />
            </Li>
            <Li onClick={() => setType(AvatarType.FEMALE)} active={type === 'female'}>
                <BiFemaleSign />
            </Li> */}
        </Ul>
    )
}

const Ul = styled.ul`
    display: flex;
    gap: 8px;
    @media (max-width: 768px) {
        justify-content: flex-end;
    }
`

const Li = styled.li`
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: 1px solid #dbdbdb;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #dbdbdb;

    ${({ active }: { active: boolean }) =>
        active &&
        `
    border: 1px solid #003594;
    color: #003594
  `};
`
