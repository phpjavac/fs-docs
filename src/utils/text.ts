import { Transforms, Text, Editor, BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

const BoldMark = {
  /// 是否粗体
  isBoldMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.bold === true,
      universal: true,
    });

    return !!match;
  },
  /// 设置粗体
  toggleBoldMark(editor: BaseEditor & ReactEditor) {
    const isActive = this.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? undefined : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },
  /// 是否有下划线
  isDecorationMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.decoration === true,
      universal: true,
    });

    return !!match;
  },
  /// 设置下划线
  toggleDecorationMark(editor: BaseEditor & ReactEditor) {
    const isActive = this.isDecorationMarkActive(editor);
    Transforms.setNodes(
      editor,
      { decoration: isActive ? undefined : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },
  /// 是否斜体
  isItalicMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.italic === true,
      universal: true,
    });

    return !!match;
  },
  /// 设置斜体
  toggleItalicMarkMark(editor: BaseEditor & ReactEditor) {
    const isActive = this.isItalicMarkActive(editor);
    Transforms.setNodes(
      editor,
      { italic: isActive ? undefined : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },
};

export { BoldMark };
