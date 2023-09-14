import { Part, RootOptions } from '../../contexts/AvatarContext.type'
import { body } from './body'
import { face } from './face'
import { foot } from './foot'
import { glass } from './glass'
import { hair } from './hair'
import { leg } from './leg'

export const avatarRoot: RootOptions = {
    url: '/avatar.glb',
    animation: 'Idle'
}

export const avatarParts: Part = {
    Hair: {
        label: '헤어',
        type: 'replace',
        defaultResource: '1',
        resources: hair
    },
    Face: {
        label: '얼굴',
        type: 'replace',
        defaultResource: '1',
        resources: face
    },
    Body: {
        label: '상의',
        type: 'replace',
        defaultResource: '1',
        resources: body
    },
    Leg: {
        label: '하의',
        type: 'replace',
        defaultResource: '1',
        resources: leg
    },
    Foot: {
        label: '신발',
        type: 'replace',
        defaultResource: '1',
        resources: foot
    },
    Glass: {
        label: '안경',
        type: 'combine',
        resources: glass
    },
    Hand: { label: '손' }
}
