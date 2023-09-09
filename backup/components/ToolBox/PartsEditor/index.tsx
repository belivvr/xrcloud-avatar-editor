import { useEffect, useState } from 'react'
import { useAvatar } from '../../../contexts/AvatarContext'
import Menu from './Menu'
import ResourceList from './ResourceList'

export default function PartsEditor() {
  const { parts } = useAvatar()
  const [menus, setMenus] = useState<string[]>(null!)
  const [selected, setSelected] = useState<string>(null!)

  if (!parts) return <></>

  useEffect(() => {
    const changeableMenu = Object.keys(parts).filter((part) => {
      const { type } = parts[part]
      return type === 'replace' || type === 'combine'
    })

    setMenus(changeableMenu)
    setSelected(changeableMenu[0])
  }, [parts])

  return (
    <div>
      <Menu
        menus={menus}
        selected={selected}
        setSelected={(part) => setSelected(part)}
      />
      <ResourceList
        partName={selected}
        resources={parts[selected]?.resources}
      />
    </div>
  )
}
