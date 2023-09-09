import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import { AnimationClip, Group } from 'three'

interface Props {
  target: Group
  onSuccess: (result: GLTFExportResult) => void
  onError: (e: any) => void
  animations: AnimationClip[]
}

export type GLTFExportResult = ArrayBuffer | Record<string, any>

export const exportAvatar = async ({
  target,
  onSuccess,
  onError,
  animations,
}: Props): Promise<void> => {
  const gltfExporter = new GLTFExporter()

  gltfExporter.parse(target, onSuccess, onError, {
    binary: true,
    onlyVisible: false,
    animations,
  })
}
