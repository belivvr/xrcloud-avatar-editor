import { Group } from 'three'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  AvatarContextValue,
  AvatarDispatchContextValue,
  AvatarType,
  Current,
  Part,
  RootOptions,
} from './AvatarContext.type'
import { getParts, getRoot } from '../configs'

export const AvatarContext = createContext<AvatarContextValue>({
  type: null!,
  root: null!,
  current: {},
})

export const AvatarDispatchContext = createContext<AvatarDispatchContextValue>({
  setType: () => {},
  setCurrent: () => {},
})

export function AvatarProvider({ children }: { children: ReactNode }) {
  const rootRef = useRef<Group>(null!)
  const [current, setCurrent] = useState<Current>(null!)
  const [type, setType] = useState<AvatarType>(AvatarType.FEMALE)
  const [root, setRoot] = useState<RootOptions>(getRoot(type))
  const [parts, setParts] = useState<Part>(getParts(type))

  useEffect(() => {
    setRoot(getRoot(type))
    setParts(getParts(type))
  }, [type])

  useEffect(() => {
    const defaultCurrent = setDefaultCurrentByPart(parts)
    setCurrent(defaultCurrent)
  }, [parts])

  const context = {
    type,
    root: {
      ...root,
      ref: rootRef,
    },
    parts,
    current,
  }

  const contextDispatch = {
    setType,
    setCurrent,
  }

  return (
    <AvatarContext.Provider value={context}>
      <AvatarDispatchContext.Provider value={contextDispatch}>
        {children}
      </AvatarDispatchContext.Provider>
    </AvatarContext.Provider>
  )
}

export const useAvatar = (): AvatarContextValue => useContext(AvatarContext)
export const useSetAvatar = (): AvatarDispatchContextValue =>
  useContext(AvatarDispatchContext)

const setDefaultCurrentByPart = (parts: Part): Current => {
  const obj: Current = {}

  for (const key in parts) {
    const part = parts[key]

    if (part.resources && part.type === 'replace') {
      const defaultResource = part.resources.find(
        ({ id }) => id === part.defaultResource
      )
      obj[key] = defaultResource ?? part.resources[0]
    }

    if (part.resources && part.type === 'combine') {
      const defaultResource = part.resources.find(
        ({ id }) => id === part.defaultResource
      )
      obj[key] = defaultResource ?? null
    }
  }

  return obj
}
