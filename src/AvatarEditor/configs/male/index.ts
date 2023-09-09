import { Part, RootOptions } from '../../contexts/AvatarContext.type'
import { body } from '../male/body'
import { face } from '../male/face'
import { foot } from '../male/foot'
import { glass } from '../male/glass'
import { hair } from '../male/hair'
import { leg } from '../male/leg'

export const maleRoot: RootOptions = {
  url: '/m_root.glb',
  animation: 'Idle',
}

export const maleParts: Part = {
  M_Hair: {
    label: '헤어',
    type: 'replace',
    defaultResource: '1',
    resources: hair,
  },
  M_Face: {
    label: '얼굴',
    type: 'replace',
    defaultResource: '1',
    resources: face,
  },
  M_Body: {
    label: '상의',
    type: 'replace',
    defaultResource: '1',
    resources: body,
  },
  M_Leg: {
    label: '하의',
    type: 'replace',
    defaultResource: '1',
    resources: leg,
  },
  M_Foot: {
    label: '신발',
    type: 'replace',
    defaultResource: '1',
    resources: foot,
  },
  M_Glass: {
    label: '안경',
    type: 'combine',
    resources: glass,
  },
  M_Hand: { label: '손' },
}
