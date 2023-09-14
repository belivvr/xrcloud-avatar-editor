import { AvatarBlueprint } from '../contexts/AvatarContext.type'

const hairs = [{ fileUrl: '/avatars/female/hairs/hair-01.glb' }]
const faces = [{ fileUrl: '/avatars/female/faces/face-01.glb' }]
const bodies = [{ fileUrl: '/avatars/female/bodies/body-01.glb' }, { fileUrl: '/parts/bodies/body-02.glb' }]
const legs = [{ fileUrl: '/avatars/female/legs/leg-01.glb' }]
const feet = [{ fileUrl: '/avatars/female/feet/foot-01.glb' }]
const hands = [{ fileUrl: '/avatars/female/hands/hand-01.glb' }]
const glasses = [{ fileUrl: '/avatars/female/glasses/glass-01.glb' }]

export const femaleAvatar: AvatarBlueprint = {
    defaultParts: {
        hair: hairs[0],
        face: faces[0],
        body: bodies[0],
        leg: legs[0],
        foot: feet[0],
        hand: hands[0]
    },
    skeleton: {
        fileUrl: '/avatars/female/skeleton.glb',
        animations: ['Walking', 'Idle']
    },
    hairs,
    faces,
    bodies,
    legs,
    feet,
    hands,
    glasses
}
