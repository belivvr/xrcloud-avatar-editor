import { Canvas } from '@react-three/fiber'
import { AvatarProvider } from './contexts/AvatarContext'
import Preview from './Preview'
import './AvatarEditor.css'

export function AvatarEditor() {
    return (
        <AvatarProvider>
            <div className="CanvasContainer">
                <Canvas className="preview">
                    <Preview />
                </Canvas>
            </div>
        </AvatarProvider>
    )
}
