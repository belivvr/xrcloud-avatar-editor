import { AvatarBlueprint, AvatarInstance } from '../contexts/AvatarContext.type'

const hairs = [{ fileUrl: '/avatars/female/hairs/hair-01.glb' }]
const faces = [{ fileUrl: '/avatars/female/faces/face-01.glb' }]
const bodies = [{ fileUrl: '/avatars/female/bodies/body-01.glb' }, { fileUrl: '/parts/bodies/body-02.glb' }]
const legs = [{ fileUrl: '/avatars/female/legs/leg-01.glb' }]
const feet = [{ fileUrl: '/avatars/female/feet/foot-01.glb' }]
const hands = [{ fileUrl: '/avatars/female/hands/hand-01.glb' }]
const glasses = [{ fileUrl: '/avatars/female/glasses/glass-01.glb' }]

export const femaleAvatar: AvatarBlueprint = {
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

export const femaleAvatarInstance: AvatarInstance = {
    currentAnimation: 'Walking',
    skeleton: femaleAvatar.skeleton,
    parts: {
        Hair: hairs[0],
        Face: faces[0],
        Body: bodies[0],
        Leg: legs[0],
        Foot: feet[0],
        Hand: hands[0],
        Glass: undefined
    }
}
