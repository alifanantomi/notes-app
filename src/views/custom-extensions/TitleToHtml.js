const Node = require("prosemirror-to-html-js").Node;

export default class TitleToHtml extends Node {
    matching () {
        return this.node.type === "title";
    }

    tag () {
        return "h1";
    }
}