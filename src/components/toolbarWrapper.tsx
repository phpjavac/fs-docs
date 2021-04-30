import React from "react";
import { Select, Tooltip } from "antd";

import "./toolbarWrapper.css";
import fontSize from "./font-size";
const { Option } = Select;

interface ToolList {
  type: string;
  icon?: string;
  name: string;
  func: () => void;
}
const ToolbarWrapper = (props: {
  undo: () => void;
  redo: () => void;
  BoldMark: () => void;
  italicMark: () => void;
  toggleDecorationMark: () => void;
}) => {
  const toolList: ToolList[] = [
    {
      type: "icon",
      icon: "revoke",
      name: "撤销",
      func: () => {
        props.undo();
      },
    },
    {
      type: "icon",
      icon: "renewal",
      name: "重做",
      func: () => {
        props.redo();
      },
    },
    {
      type: "icon",
      icon: "print",
      name: "打印",
      func: () => {
        console.log("打印");
      },
    },
    {
      type: "textSelect",
      name: "文字样式",
      func: () => {
        console.log("文字样式");
      },
    },

    {
      type: "fontSize",
      name: "文字大小",
      func: () => {
        console.log("文字大小");
      },
      
    },
    {
      type: "icon",
      icon: "cuti",
      name: "粗体",
      func: () => {
        props.BoldMark();
      },
    },
    {
      type: "icon",
      icon: "xietiim",
      name: "斜体",
      func: () => {
        props.italicMark();
        console.log("斜体");
      },
    },
    {
      type: "icon",
      icon: "xiahuaxian",
      name: "下划线",
      func: () => {
        props.toggleDecorationMark()
        console.log("下划线");
      },
    },
    {
      type: "icon",
      icon: "yanse",
      name: "文本颜色",
      func: () => {
        console.log("文本颜色");
      },
    },
    {
      type: "icon",
      icon: "juzuo",
      name: "左对齐",
      func: () => {
        console.log("左对齐");
      },
    },
    {
      type: "icon",
      icon: "juzhong",
      name: "居中对齐",
      func: () => {
        console.log("居中对齐");
      },
    },
    {
      type: "icon",
      icon: "juyou",
      name: "右对齐",
      func: () => {
        console.log("右对齐");
      },
    },
    {
      type: "icon",
      icon: "735bianjiqi_liangduanduiqi",
      name: "两端对齐",
      func: () => {
        console.log("两端对齐");
      },
    },
    {
      type: "icon",
      icon: "724bianjiqi_hangjianju",
      name: "行间距",
      func: () => {
        console.log("行间距");
      },
    },
    {
      type: "icon",
      icon: "zengjiasuojinliang",
      name: "增加缩进",
      func: () => {
        console.log("增加缩进");
      },
    },
    {
      type: "icon",
      icon: "jianshaosuojin",
      name: "减少缩进",
      func: () => {
        console.log("减少缩进");
      },
    },
  ];
  const customClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: { func: () => void }
  ) => {
    event.preventDefault();
    item.func();
  };
  const IconList = toolList.map((item) => {
    switch (item.type) {
      case "icon":
        return (
          <React.Fragment key={item.name}>
            <div
              className="tool-icon"
              onMouseDown={(event) => customClick(event, item)}
            >
              <Tooltip title={item.name}>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref={`#icon-${item.icon}`}></use>
                </svg>
              </Tooltip>
            </div>
          </React.Fragment>
        );
      case "textSelect":
        return (
          <Select
            defaultValue="p"
            size="small"
            key="textSizeSelect"
            style={{ width: 100, marginRight: 6 }}
          >
            <Option key="p" value="p">
              普通文本
            </Option>
            <Option key="h1" value="h1">
              标题
            </Option>
            <Option key="h2" value="h2">
              副标题
            </Option>
            <Option key="h3" value="h3">
              标题1
            </Option>
            <Option key="h4" value="h4">
              标题2
            </Option>
            <Option key="h5" value="h5">
              标题3
            </Option>
          </Select>
        );
      case "fontSize":
        return (
          <Select
            showSearch
            size="small"
            key="fontSizeSelect"
            style={{ width: 80 }}
            defaultValue={fontSize[0]}
            placeholder="Select a person"
          >
            {fontSize.map((size) => (
              <Option key={size} value={size}>
                {size}
              </Option>
            ))}
          </Select>
        );

      default:
        return <div key=""></div>;
    }
  });

  return <div className="docs-toolbar-wrapper">{IconList}</div>;
};

export default ToolbarWrapper;
