import { useThree } from '@react-three/fiber'
import { MutableRefObject, forwardRef, useImperativeHandle } from 'react'
import { AnimationClip, Group } from 'three'
import { GLTFExporter } from 'three-stdlib'

export interface AvatarExporterHandles {
    exportAvatar: () => Promise<ArrayBuffer | undefined>
    getSnapshot: () => string | undefined
}

interface Props {
    rootRef: MutableRefObject<Group | null>
    animations: AnimationClip[]
}

export const AvatarExporter = forwardRef<AvatarExporterHandles, Props>(({ rootRef, animations }, ref) => {
    const gl = useThree((state) => state.gl)

    useImperativeHandle(ref, () => ({
        exportAvatar: async (): Promise<ArrayBuffer | undefined> => {
            if (rootRef.current) {
                const gltfExporter = new GLTFExporter()

                try {
                    const result = await gltfExporter.parseAsync(rootRef.current, {
                        binary: true,
                        onlyVisible: false,
                        animations
                    })

                    return result as ArrayBuffer
                } catch (error) {
                    alert(error)
                }
            }

            return undefined
        },
        getSnapshot: (): string | undefined => {
            if (rootRef.current) {
                const imageData = gl.domElement.toDataURL('image/png')

                return imageData
            }

            return undefined
        }
    }))

    return <group />
})
