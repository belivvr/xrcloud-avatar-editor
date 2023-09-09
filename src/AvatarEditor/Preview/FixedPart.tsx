import { PartData } from './Avatar'

interface Props {
  name: string
  root: PartData
}

export default function FixedPart({ name, root }: Props) {
  return (
    <skinnedMesh
      name={name}
      geometry={root.geometry}
      material={root.material}
      skeleton={root.skeleton}
    />
  )
}
