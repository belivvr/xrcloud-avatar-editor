import styled from '@emotion/styled'
import { useAvatar } from '../../../contexts/AvatarContext'

interface Props {
  menus: string[]
  selected: string
  setSelected: (selected: string) => void
}

export default function Menu({ menus, selected, setSelected }: Props) {
  const { parts } = useAvatar()

  return (
    <Ul>
      {parts && menus ? (
        menus?.map((partName: string) => {
          const part = parts[partName]
          return (
            <Li
              key={partName}
              onClick={() => setSelected(partName)}
              active={partName === selected}
            >
              {part?.label ?? ''}
            </Li>
          )
        })
      ) : (
        <></>
      )}
    </Ul>
  )
}

const Ul = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  list-style: none;
  padding: 0.5rem;
`

const Li = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #191919;
  padding-bottom: 8px;
  cursor: pointer;
  ${({ active }: { active: boolean }) =>
    active &&
    `
  border-bottom: 4px solid #003594;
  color: #003594;
  cursor: default
  `}
`
