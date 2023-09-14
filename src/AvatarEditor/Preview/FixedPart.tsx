import { PartData } from './Avatar'

interface Props {
  name: string
  root: PartData
}

export default function FixedPart({ name, root }: Props) {
    console.log(name,root)

    return (
    <skinnedMesh
      name={name}
      geometry={root.geometry}
      material={root.material}
      skeleton={root.skeleton}
    />
  )
}
