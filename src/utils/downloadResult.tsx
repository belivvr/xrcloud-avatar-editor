import { GLTFExportResult } from './exportGLTF'

interface Props {
  result: GLTFExportResult
  fileName: string
}

export const downloadResult = async ({
  result,
  fileName,
}: Props): Promise<void> => {
  const blob = new Blob([result as ArrayBuffer], { type: 'model/gltf-binary' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a') as unknown as HTMLAnchorElement
  a.href = url
  a.download = fileName
  a.click()
}
