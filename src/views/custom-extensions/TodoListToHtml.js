const Node = require("prosemirror-to-html-js").Node;

export default class TodoListToHtml extends Node {
    matching () {
      return this.node.type === "todo_list";
    }

    tag () {
      return [
        {
          tag: "ul",
          attrs: {
            'type': this.node.type.name,
          }
        },
      ]
    }
}