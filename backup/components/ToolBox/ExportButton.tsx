import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Button as MuiButton } from '@mui/material'
import { useGLTF } from '@react-three/drei'
import { useAvatar } from '../../contexts/AvatarContext'
import { exportAvatar, GLTFExportResult } from '../../utils/exportGLTF'
import { downloadResult } from '../../utils/downloadResult'
import { getSnapshot } from '../../utils/snapshot'
import axios from 'axios'
import styled from '@emotion/styled'

export default function ExportButton() {
  const { root } = useAvatar()
  const { animations } = useGLTF(root.url)
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const apiUrl = searchParams.get('url')
  const name = searchParams.get('name')
  const download = searchParams.get('download')
  const token = searchParams.get('token')
  const [loading, setLoading] = useState<boolean>(false)

  const handleExportAvatar = async () => {
    setLoading(true)

    await exportAvatar({
      target: root.ref.current,
      onSuccess,
      onError,
      animations,
    })
  }

  const onSuccess = async (result: GLTFExportResult) => {
    if (download === 'true') {
      await downloadResult({ result, fileName: 'result.glb' })
    }

    if (apiUrl) {
      const avatarThumbnailDataUrl = await getSnapshot(root.ref.current)
      const avatarThumbnailFile = await (
        await fetch(avatarThumbnailDataUrl)
      ).blob()
      const avatarGlbFile = new Blob([result as Blob])

      const formData = new FormData()
      formData.set(
        'avatarCreateDto',
        JSON.stringify({ displayName: name ?? '' })
      )
      formData.set('avatarGlbFile', avatarGlbFile, 'avatar.glb')
      formData.set('avatarThumbnailFile', avatarThumbnailFile, 'thumbnail.png')

      await axios
        .post(apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Hubs-Authorization': token as string,
          },
          withCredentials: true,
        })
        .then(() => alert('아바타가 저장되었습니다.'))
        .catch((e) => onError(e))
    }

    setLoading(false)
  }

  const onError = (error: any) => {
    console.error(error)
    setLoading(false)
  }

  return (
    <Button
      onClick={handleExportAvatar}
      disabled={loading}
      variant="contained"
      disableElevation
    >
      {loading ? '로딩중...' : '저장'}
    </Button>
  )
}

const Button = styled(MuiButton)`
  background: #003594;
  @media (max-width: 768px) {
    width: 100%;
  }
`
