import { Layout } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import React, { useState, useCallback, useMemo } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { Editor, createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import "./page.css";
import "./App.css";
import ToolbarWrapper from "./components/toolbarWrapper";
import { BoldMark } from "./utils/text";
import { CustomText } from "./shims-slate";
import withPages from "./plugins/pages";
function App() {
  const DefaultElement = (props: {
    attributes: JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLParagraphElement> &
      React.HTMLAttributes<HTMLParagraphElement>;
    children:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined;
  }) => {
    return (
      <p className="test" {...props.attributes}>
        {props.children}
      </p>
    );
  };

  const Leaf = (props: {
    attributes: JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLSpanElement> &
      React.HTMLAttributes<HTMLSpanElement>;
    leaf: CustomText;
    children:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined;
  }) => {
    return (
      <span
        {...props.attributes}
        style={{
          fontWeight: props.leaf.bold ? "bold" : "normal",
          textDecoration: props.leaf.decoration ? "underline red" : "none",
          fontStyle: props.leaf.italic ? "italic" : "normal",
        }}
      >
        {props.children}
      </span>
    );
  };
  const initialValue: Descendant[] = [
    {
      type: "page",
      children: [
        {
          type: "paragraph",
          children: [{ text: "A line of text in a paragraph." }],
        },
      ],
    },
  ];
  const [value, setValue] = useState<Descendant[]>(initialValue);

  const [editor] = useState(
    useMemo(() => withHistory(withReact(createEditor())), [])
  );
  const renderElement = useCallback(
    (props) => {
      switch (props.element.type) {
        case "page":
          return (
            <div
              {...props.attributes}
              className="page"
              onScroll={() => pageOverflowed(editor)}
            >
              {props.children}
            </div>
          );
        case "paragraph":
          return <DefaultElement {...props} />;
        default:
          return <DefaultElement {...props} />;
      }
    },
    [editor]
  );
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  // editor.isVoid = (element) => {
  //   return element.type === "page";
  // };
  function pageOverflowed(editor: Editor) {
    console.log("gun", editor.children);

    // On an overflow, insert a new page and move content down.
    editor.deleteBackward("block");
    // Transforms.insertText(editor, "A new string of text.", { at: [0, 0] });
    console.log("gun", editor);
  }
  const keyCode = (event: { keyCode: number }) => {
    if (event.keyCode === 13) {
      //按下回车键
      //do something
    }
  };
  // const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <div className="App">
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="menu"></div>
          <ToolbarWrapper
            redo={() => editor.redo()}
            undo={() => editor.undo()}
            BoldMark={() => BoldMark.toggleBoldMark(editor)}
            italicMark={() => BoldMark.toggleItalicMarkMark(editor)}
            toggleDecorationMark={() => BoldMark.toggleDecorationMark(editor)}
          />
        </Header>
        <Content style={{ marginTop: "64px" }}>
          <Slate
            editor={editor}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <Editable
              onKeyDown={keyCode}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
            />
          </Slate>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
