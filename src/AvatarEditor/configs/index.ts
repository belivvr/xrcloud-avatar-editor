import { AvatarType, Part, RootOptions } from '../contexts/AvatarContext.type'
import { femaleParts, femaleRoot } from './female'
import { maleParts, maleRoot } from './male'

export const getRoot = (type: AvatarType): RootOptions => {
  let root: RootOptions

  switch (type) {
    case AvatarType.MALE:
      root = maleRoot
      break
    case AvatarType.FEMALE:
      root = femaleRoot
      break
    default:
      root = maleRoot
      break
  }

  return root
}

export const getParts = (type: AvatarType): Part => {
  let parts: Part

  switch (type) {
    case AvatarType.MALE:
      parts = maleParts
      break
    case AvatarType.FEMALE:
      parts = femaleParts
      break
    default:
      parts = maleParts
      break
  }

  return parts
}
