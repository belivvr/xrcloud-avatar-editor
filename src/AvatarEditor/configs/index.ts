import { body } from './female/body'
import { face } from './female/face'
import { foot } from './female/foot'
import { glass } from './female/glass'
import { hair } from './female/hair'
import { leg } from './female/leg'

import { AvatarType, Part, RootOptions } from '../contexts/AvatarContext.type'
import { maleRoot } from './male'

export const getRoot = (type: AvatarType): RootOptions => {
    let root: RootOptions

    switch (type) {
        case AvatarType.MALE:
            root = maleRoot
            break
        case AvatarType.FEMALE:
            root = avatarRoot
            break
        default:
            root = avatarRoot
            break
    }

    return root
}

export const avatarRoot: RootOptions = {
    url: '/avatar.glb',
    animation: 'Idle'
}

export const getParts = (type: AvatarType): Part => {
    return {
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
}
