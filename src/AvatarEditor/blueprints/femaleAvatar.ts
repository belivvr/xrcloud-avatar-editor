import { AvatarBlueprint, AvatarInstance } from '../contexts/AvatarContext.type'

export const femaleAvatarBlueprint: AvatarBlueprint = {
    skeleton: {
        fileUrl: '/avatars/female/skeleton.glb',
        animations: ['Walking', 'Idle']
    },
    hairs: [{ fileUrl: '/avatars/female/hairs/hair-01.glb' }],
    faces: [
        { fileUrl: '/avatars/female/faces/face-01.glb' },
        { fileUrl: '/avatars/female/faces/face-01 copy.glb' },
        { fileUrl: '/avatars/female/faces/face-01 copy 2.glb' },
        { fileUrl: '/avatars/female/faces/face-01 copy 3.glb' },
        { fileUrl: '/avatars/female/faces/face-01 copy 4.glb' },
        { fileUrl: '/avatars/female/faces/face-01 copy 5.glb' },
        { fileUrl: '/avatars/female/faces/face-01 copy 6.glb' },
        { fileUrl: '/avatars/female/faces/face-01 copy 7.glb' },
        { fileUrl: '/avatars/female/faces/face-01 copy 8.glb' },
        { fileUrl: '/avatars/female/faces/face-01 copy 9.glb' },
        { fileUrl: '/avatars/female/faces/face-01 copy 10.glb' }
    ],
    bodies: [
        { fileUrl: '/avatars/female/bodies/body-01.glb' },
        { fileUrl: '/avatars/female/bodies/body-02.glb' },
        { fileUrl: '/avatars/female/bodies/body-02 copy.glb' },
        { fileUrl: '/avatars/female/bodies/body-02 copy 2.glb' },
        { fileUrl: '/avatars/female/bodies/body-02 copy 3.glb' },
        { fileUrl: '/avatars/female/bodies/body-02 copy 4.glb' },
        { fileUrl: '/avatars/female/bodies/body-02 copy 5.glb' },
        { fileUrl: '/avatars/female/bodies/body-02 copy 6.glb' },
        { fileUrl: '/avatars/female/bodies/body-02 copy 7.glb' }
    ],
    legs: [{ fileUrl: '/avatars/female/legs/leg-01.glb' }],
    feet: [{ fileUrl: '/avatars/female/feet/foot-01.glb' }],
    hands: [{ fileUrl: '/avatars/female/hands/hand-01.glb' }],
    glasses: [{ fileUrl: '/avatars/female/glasses/glass-01.glb' }]
}

export const femaleAvatarInstance: AvatarInstance = {
    currentAnimation: 'Walking',
    skeleton: femaleAvatarBlueprint.skeleton,
    parts: {
        Hair: femaleAvatarBlueprint.hairs[0],
        Face: femaleAvatarBlueprint.faces[0],
        Body: femaleAvatarBlueprint.bodies[0],
        Leg: femaleAvatarBlueprint.legs[0],
        Foot: femaleAvatarBlueprint.feet[0],
        Hand: femaleAvatarBlueprint.hands[0],
        Glass: undefined
    }
}

type BlueprintCallback = (item: any) => void

export function loopThroughBlueprint(blueprint: AvatarBlueprint, callback: BlueprintCallback) {
    const keys = Object.keys(blueprint) as Array<keyof typeof blueprint>

    keys.forEach((key) => {
        const value = blueprint[key]

        if (Array.isArray(value)) {
            for (const item of value) {
                callback(item)
            }
        } else {
            callback(value)
        }
    })
}
