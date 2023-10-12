import styled from '@emotion/styled'
import { Suspense, useRef, useState } from 'react'
import { AvatarProvider } from './AvatarContext'
import { AvatarDisplay } from './AvatarDisplay'
import { AvatarExporterHandles } from './AvatarDisplay/AvatarExporter'
import { AvatarSelector } from './AvatarSelector'
import { ExportView } from './ExportView'

export function AvatarEditor() {
    const displayRef = useRef<AvatarExporterHandles | null>(null)
    const [avatarImage, setAvatarImage] = useState<string | undefined>()

    const handleDownloadGlb = async () => {
        const result = await displayRef.current?.exportAvatar()

        if (result) {
            const blob = new Blob([result], { type: 'model/gltf-binary' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a') as unknown as HTMLAnchorElement
            a.href = url
            a.download = 'avatar.glb'
            a.click()
        } else {
            alert('export failed')
        }
    }

    const handleSnapshot = async () => {
        const width = 400
        const height = 600
        const imageUrl = await await displayRef.current?.getSnapshot(width, height)
        setAvatarImage(imageUrl)
    }

    return (
        <AvatarProvider>
            <RowFrame>
                <CanvasFrame>
                    <Suspense fallback={<p>Loading...</p>}>
                        <AvatarDisplay ref={displayRef} />
                    </Suspense>
                </CanvasFrame>
                {avatarImage && <SnapshotView src={avatarImage} alt="Avatar Thumbnail" />} {/* 이미지 렌더링 */}
            </RowFrame>
            <ExportView />
            <div onClick={handleDownloadGlb}>Download GLB</div>
            <div onClick={handleSnapshot}>Snapshot</div>
            <AvatarSelector />
        </AvatarProvider>
    )
}

const CanvasFrame = styled.div`
    width: 400px;
    height: 600px;
    background: #f8f8f8;
`
const RowFrame = styled.div`
    display: flex;
`
const SnapshotView = styled.img`
    width: 400px;
    height: 600px;
    background: #f8f8f8;
`
