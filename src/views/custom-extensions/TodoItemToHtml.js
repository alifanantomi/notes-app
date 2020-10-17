const Node = require("prosemirror-to-html-js").Node;

export default class TodoItemToHtml extends Node {
    matching () {
      return this.node.type === "todo_item";
    }

    tag () {
      return [
        {
          tag: "li",
          attrs: {
            'type': this.node.type.name,
            'done': this.node.type.done,
          }
        },
        {
          tag: 'span',
          class: 'todo-checkbox'
        }
      ]
    }
}