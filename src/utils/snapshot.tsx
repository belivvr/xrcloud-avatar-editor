import {
  AmbientLight,
  DirectionalLight,
  Group,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three'

export const getSnapshot = async (avatar: Group): Promise<string> => {
  const renderer = new WebGLRenderer({
    antialias: true,
    preserveDrawingBuffer: true,
    alpha: true,
  })

  const width = 720
  const height = 1440

  renderer.setSize(width, height, false)

  const scene = new Scene()

  const camera = new PerspectiveCamera(80, width / height, 0.1, 1000)
  camera.position.set(0, -0.3, 2.1)
  camera.lookAt(new Vector3(0, -0.3, 0))

  const ambientLight = new AmbientLight(0xffffff, 0.6)
  ambientLight.position.set(1, 2, 2)

  const directionalLight = new DirectionalLight(0xffffff, 0.6)
  directionalLight.position.set(1, 2, 2)

  const clonedAvatar = avatar.clone()

  scene.add(camera)
  scene.add(ambientLight)
  scene.add(directionalLight)
  scene.add(clonedAvatar)

  renderer.render(scene, camera)

  return renderer.domElement.toDataURL('image/png')
}
