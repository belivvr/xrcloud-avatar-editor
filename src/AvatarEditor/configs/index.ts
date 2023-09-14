import { Part, RootOptions } from '../contexts/AvatarContext.type'
import { body } from './body'
import { face } from './face'
import { foot } from './foot'
import { glass } from './glass'
import { hair } from './hair'
import { leg } from './leg'
import { hand } from './hand'

export const getRoot = (): RootOptions => {
    let root: RootOptions
    root = {
        url: '/avatar.glb',
        animation: 'Walking'
    }

    return root
}

export const getParts = (): Part => {
    return {
        Hair: {
            defaultResource: '1',
            resources: hair
        },
        Face: {
            defaultResource: '1',
            resources: face
        },
        Body: {
            defaultResource: '1',
            resources: body
        },
        Leg: {
            defaultResource: '1',
            resources: leg
        },
        Foot: {
            defaultResource: '1',
            resources: foot
        },
        Glass: {
            // defaultResource: '1',
            resources: glass
        },
        Hand: {
            defaultResource: '1',
            resources: hand
        }
    }
}
