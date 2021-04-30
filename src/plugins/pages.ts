import { Editor, Range, Point, Element as SlateElement, BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

const withPages = (editor: Editor) => {
    const { deleteBackward, deleteForward, insertBreak } = editor

    editor.deleteBackward = unit => {        
      const { selection } = editor
  
      if (selection && Range.isCollapsed(selection)) {
        const [cell] = Editor.nodes(editor, {
          match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === 'paragraph',
        })
  
        if (cell) {
          const [, cellPath] = cell
          const start = Editor.start(editor, cellPath)
  
          if (Point.equals(selection.anchor, start)) {
            return
          }
        }
      }
  
      deleteBackward(unit)
    }
  
    editor.deleteForward = unit => {
      const { selection } = editor
  
      if (selection && Range.isCollapsed(selection)) {
        const [cell] = Editor.nodes(editor, {
          match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === 'paragraph',
        })
  
        if (cell) {
          const [, cellPath] = cell
          const end = Editor.end(editor, cellPath)
  
          if (Point.equals(selection.anchor, end)) {
            return
          }
        }
      }
  
      deleteForward(unit)
    }
  
    editor.insertBreak = () => {
      const { selection } = editor
        console.log("kakaka ");
        
      if (selection) {
        const [page] = Editor.nodes(editor, {
          match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === 'page',
        })
  
        if (page) {
          return
        }
      }
  
      insertBreak()
    }
    return editor as BaseEditor & ReactEditor & HistoryEditor;
};

export default withPages;
