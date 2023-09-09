import styled from '@emotion/styled'
import { useAvatar, useSetAvatar } from '../../../contexts/AvatarContext'
import { Resource } from '../../../contexts/AvatarContext.type'
import { IoBanSharp } from 'react-icons/io5'

interface Props {
  partName: string
  resources?: Resource[]
}

export default function ResourceList({ partName, resources }: Props) {
  const { parts, current } = useAvatar()
  const { setCurrent } = useSetAvatar()

  const handleChange = (resource: Resource | null) => {
    setCurrent({ ...current, [partName]: resource })
  }

  if (!parts) {
    return <></>
  }

  return (
    <Container>
      {parts[partName]?.type === 'combine' && (
        <Item onClick={() => handleChange(null)}>
          <ImageBox active={!current[partName]}>
            <IoBanSharp />
          </ImageBox>
          <Text>없음</Text>
        </Item>
      )}
      {resources ? (
        resources.map((resource) => {
          const { id, label, thumbnailUrl } = resource
          return (
            <Item key={id} onClick={() => handleChange(resource)}>
              <SelectText active={id === current[partName]?.id}>
                {label}
              </SelectText>
              {/* TODO: 파츠별 썸네일이 생기면 글자가 아니라 thumbnail 이미지가 보이도록 수정 */}
              {/* <ImageBox
                style={{ backgroundImage: `url(${thumbnailUrl})` }}
                active={id === current[partName]?.id}
              />
              <Text>{label}</Text> */}
            </Item>
          )
        })
      ) : (
        <NoContentBox>선택할 수 있는 리소스가 없습니다.</NoContentBox>
      )}
    </Container>
  )
}

const Container = styled.div`
  overflow-x: hidden;
`

const Item = styled.div`
  max-width: 80px;
  float: left;
  margin: 8px;
  cursor: pointer;
`

const ImageBox = styled.div`
  width: 80px;
  height: 80px;
  background: #f0f0f0;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  color: #ffffff;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  ${({ active }: { active: boolean }) => `
    border: 1px solid ${active ? `#003594` : `#dbdbdb`};
  `};
`

const Text = styled.div`
  width: 100%;
  height: 40px;
  font-family: 'Noto Sans KR';
  font-size: 14px;
  color: #595959;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: 4px;
`

const NoContentBox = styled.div`
  width: 100%;
  padding: 2rem 1rem;
  color: #595959;
  text-align: center;
  font-size: 14px;
`

const SelectText = styled.div`
  width: 80px;
  height: 80px;
  background: #f0f0f0;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.1rem;
  box-sizing: border-box;
  font-size: 1rem;
  text-align: center;
  word-break: keep-all;
  line-height: 1.2;
  color: #555;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  ${({ active }: { active: boolean }) => `
  border: 2px solid ${active ? `#003594` : `#dbdbdb`};
`};
`
