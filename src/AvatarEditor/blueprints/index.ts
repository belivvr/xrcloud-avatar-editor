import { AvatarPart, AvatarBlueprint } from '../types'
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
