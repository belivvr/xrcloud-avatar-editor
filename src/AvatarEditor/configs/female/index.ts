import { Part, RootOptions } from '../../contexts/AvatarContext.type'
import { body } from '../female/body'
import { face } from '../female/face'
import { foot } from '../female/foot'
import { glass } from '../female/glass'
import { hair } from '../female/hair'
import { leg } from '../female/leg'

export const femaleRoot: RootOptions = {
  url: '/fm_root.glb',
  animation: 'Idle',
}

export const femaleParts: Part = {
  FM_Hair: {
    label: '헤어',
    type: 'replace',
    defaultResource: '1',
    resources: hair,
  },
  FM_Face: {
    label: '얼굴',
    type: 'replace',
    defaultResource: '1',
    resources: face,
  },
  FM_Body: {
    label: '상의',
    type: 'replace',
    defaultResource: '1',
    resources: body,
  },
  FM_Leg: {
    label: '하의',
    type: 'replace',
    defaultResource: '1',
    resources: leg,
  },
  FM_Foot: {
    label: '신발',
    type: 'replace',
    defaultResource: '1',
    resources: foot,
  },
  FM_Glass: {
    label: '안경',
    type: 'combine',
    resources: glass,
  },
  FM_Hand: { label: '손' },
}
