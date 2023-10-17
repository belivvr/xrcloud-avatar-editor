import styled from '@emotion/styled'
import { Suspense, useRef, useState } from 'react'
import { AvatarProvider } from './AvatarContext'
import { AvatarDisplay, AvatarDisplayHandles } from './AvatarDisplay'
import { AvatarSelector } from './AvatarSelector'

export function AvatarEditor() {
    const displayRef = useRef<AvatarDisplayHandles | null>(null)
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
        const imageUrl = await await displayRef.current?.getSnapshot()
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
                <div>
                <SnapshotTitle>Snapshot</SnapshotTitle>
                    {avatarImage && <SnapshotView src={avatarImage} alt="Avatar Thumbnail" />}
                </div>
            </RowFrame>
            <RowFrame>
                <Button onClick={handleDownloadGlb}>Download GLB</Button>
                <Button onClick={handleSnapshot}>Snapshot</Button>
            </RowFrame>
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
const SnapshotTitle = styled.div`
    position: absolute;
    width: 400px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
`
const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 40px;
    border-radius: 5px;
    background-color: #336699;
`
