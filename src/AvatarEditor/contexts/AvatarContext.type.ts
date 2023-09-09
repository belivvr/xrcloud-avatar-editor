import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { Group } from 'three'

export interface AvatarContextValue {
  type: AvatarType
  root: Root
  parts?: Part
  current: Current
}

export interface AvatarDispatchContextValue {
  setType: Dispatch<SetStateAction<AvatarType>>
  setCurrent: Dispatch<SetStateAction<Current>>
}

export enum AvatarType {
  MALE = 'male',
  FEMALE = 'female',
}

export interface Root {
  url: string
  animation?: string
  ref: MutableRefObject<Group>
}

export interface RootOptions {
  url: string
  animation?: string
}

export type Part = Record<string, PartValue>

interface PartValue {
  label?: string
  type?: 'combine' | 'replace'
  defaultResource?: string
  resources?: Resource[]
}

export interface Resource {
  id: string
  label?: string
  thumbnailUrl?: string
  fileUrl: string
}

export type Current = Record<string, Resource | null>
