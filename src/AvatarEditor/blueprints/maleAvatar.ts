import { AvatarBlueprint } from '../contexts/AvatarContext'

export const maleAvatarBlueprint: AvatarBlueprint = {
    skeleton: {
        fileUrl: '/avatars/male/skeleton.glb',
        animations: ['Running', 'Walking', 'Idle']
    },
    hairs: [{ fileUrl: '/avatars/male/hairs/hair-01.glb' }],
    faces: [{ fileUrl: '/avatars/male/faces/face-01.glb' }],
    bodies: [
        { fileUrl: '/avatars/male/bodies/body-01.glb' },
        { fileUrl: '/avatars/male/bodies/body-02.glb' }
    ],
    legs: [{ fileUrl: '/avatars/male/legs/leg-01.glb' }],
    feet: [{ fileUrl: '/avatars/male/feet/foot-01.glb' }],
    hands: [{ fileUrl: '/avatars/male/hands/hand-01.glb' }],
    glasses: [{ fileUrl: '/avatars/male/glasses/glass-01.glb' }]
}
