import { AvatarBlueprint } from '../contexts/AvatarContext'

export const femaleAvatarBlueprint: AvatarBlueprint = {
    skeleton: {
        fileUrl: '/avatars/female/skeleton.glb',
        animations: ['Running', 'Walking', 'Idle']
    },
    hairs: [{ fileUrl: '/avatars/female/hairs/hair-01.glb' }],
    faces: [{ fileUrl: '/avatars/female/faces/face-01.glb' },
    { fileUrl: '/avatars/female/faces/face-02.glb' }],
    bodies: [
        { fileUrl: '/avatars/female/bodies/body-01.glb' },
        { fileUrl: '/avatars/female/bodies/body-02.glb' },
        { fileUrl: '/avatars/female/bodies/body-03.glb' }
    ],
    legs: [{ fileUrl: '/avatars/female/legs/leg-01.glb' }],
    feet: [{ fileUrl: '/avatars/female/feet/foot-01.glb' }],
    hands: [{ fileUrl: '/avatars/female/hands/hand-01.glb' }],
    glasses: [{ fileUrl: '/avatars/female/glasses/glass-01.glb' }]
}
