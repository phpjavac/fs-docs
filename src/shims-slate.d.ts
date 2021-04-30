import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'

type CustomText = {type?:string,children?: CustomText[], text?: string; bold?: boolean; decoration?:boolean; italic?: boolean }

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

declare module 'slate' {
  interface CustomTypes {
    
    Editor: BaseEditor & ReactEditor
    Element: { type: string; children: CustomText[] }
    Text: CustomText
  }
}