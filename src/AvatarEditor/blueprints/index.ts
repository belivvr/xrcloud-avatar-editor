import { AvatarBlueprint, AvatarInstance, AvatarPart } from '../contexts/AvatarContext'
import { femaleAvatarBlueprint } from './femaleAvatar'
import { maleAvatarBlueprint } from './maleAvatar'

type BlueprintCallback = (item: AvatarPart) => void

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

export const allAvatarBlueprints = [femaleAvatarBlueprint, maleAvatarBlueprint]

export function makeAvatarInstance(blueprint: AvatarBlueprint): AvatarInstance {
    return {
        currentAnimation: blueprint.skeleton.animations[0],
        skeleton: blueprint.skeleton,
        parts: {
            Hair: blueprint.hairs[0],
            Face: blueprint.faces[0],
            Body: blueprint.bodies[0],
            Leg: blueprint.legs[0],
            Foot: blueprint.feet[0],
            Hand: blueprint.hands[0],
            Glass: undefined
        }
    }
}
