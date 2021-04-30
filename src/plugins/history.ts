import { Editor, Operation } from "slate";
import { HistoryEditor } from "slate-history";


/**
 * withHistory 插件使用 撤消(redo) 和 重做(undo) 堆栈来跟踪对 Slate编辑器 执行操作时的操作历史记录。
 */
 export const withHistory = <T extends Editor>(editor: T) => {
    const e = editor as T & HistoryEditor;
    const {apply} = e;
    // ...

    e.redo = () => {
        // ...
    };

    e.undo = () => {
        // ...
    };

    e.apply = (op: Operation) => {
        // ...
        apply(op);
    };

    return e;
};