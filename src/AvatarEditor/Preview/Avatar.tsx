import {
  BufferGeometry,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
} from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useAvatar } from '../contexts/AvatarContext'
import Part from './Part'
import FixedPart from './FixedPart'
// import AnimationsControl from './AnimationsControls'

export type GLTFResult = GLTF & {
  nodes: Record<string, SkinnedMesh>
  materials: Record<string, MeshStandardMaterial>
}
export interface PartData {
  geometry?: BufferGeometry
  material?: MeshStandardMaterial
  skeleton: Skeleton
}

export default function Avatar() {
  const { root, parts, current } = useAvatar()
  const {
    nodes: rootNodes,
    materials: rootMaterial,
    // animations,
  } = useGLTF(root.url) as GLTFResult

  console.log("Avatar")
  return (
    <group>
      <group name="Scene">
        <group name="Armature" ref={root.ref} position={[0, 0, 0]}>
          <primitive object={rootNodes.Hips} />
          {/* {root.animation && <AnimationsControl animations={animations} />} */}
          {parts &&
            Object.keys(parts).map((partName) => {
              const type = parts[partName].type

              const rootData = {
                geometry: rootNodes[partName].geometry,
                material: rootMaterial[`Material_${partName}`],
                skeleton: rootNodes[partName].skeleton,
              }

              if (!type) {
                return (
                  <FixedPart key={partName} name={partName} root={rootData} />
                )
              }

              if (!current[partName]) {
                return <group key={partName} name={partName} />
              }

              return <Part key={partName} name={partName} root={rootData} />
            })}
        </group>
      </group>
    </group>
  )
}
