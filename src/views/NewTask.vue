<template>
  <div class="editor px-3">

    <div class="editor__page-control d-flex justify-start align-center">
      <v-btn small text class="text-none text-body-2 px-2" color="rgba(255, 255, 255, 0.4)">
        <v-icon left class="mr-1">mdi-image</v-icon>
        Add cover
      </v-btn>
    </div>

    <editor-floating-menu :editor="editor" v-slot="{ commands, isActive, menu }">
      <div 
        class="editor__floating-menu"
        :class="{ 'is-active': menu.isActive }"
        :style="`top: ${menu.top}px`"
      >

        <button 
          class="menubar__button" 
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })">
          <v-icon>mdi-format-header-1</v-icon>
        </button>

        <button 
          class="menubar__button" 
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })">
          <v-icon>mdi-format-header-2</v-icon>
        </button>

        <button 
          class="menubar__button" 
          :class="{ 'is-active' : isActive.bold() }"
          @click="commands.bold"
          text depressed>
          <v-icon>mdi-format-bold</v-icon>  
        </button>

        <button 
          class="menubar__button" 
          :class="{ 'is-active' : isActive.paragraph() }"
          @click="commands.paragraph">
          <v-icon>mdi-format-pilcrow</v-icon>  
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block">
          <v-icon>mdi-code-tags</v-icon>  
        </button>

        <!-- <button
          class="menubar__button"
          :class="{ 'is-active': isActive.todo_list() }"
          @click="commands.todo_list">
          <v-icon>mdi-format-list-checks</v-icon>  
        </button> -->
      </div>
    </editor-floating-menu>
    <editor-content class="editor__content" :editor="editor" />

    <div class="editor__page-control d-flex justify-start align-center">
      <v-btn text @click="saveTask" class="text-none text-body-2 px-2" color="rgba(255, 255, 255, 0.4)">
        Save
      </v-btn>
      <v-btn text @click="preview = !preview" class="text-none text-body-2 px-2" color="rgba(255, 255, 255, 0.4)">
        Preview
      </v-btn>
    </div>
    
    <div class="output" v-if="preview">
      <div>{{ tasks }}</div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorFloatingMenu  } from 'tiptap'
import { 
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  TrailingNode,
  Placeholder
} from 'tiptap-extensions'
import Doc from './custom-extensions/Doc'
import Title from './custom-extensions/Title'
import TitleToHtml from './custom-extensions/TitleToHtml'

export default {
  components: {
    EditorFloatingMenu ,
    EditorContent
  },
  data: function() {
    return {
      editor: new Editor({
        autoFocus: true,
        extensions: [
          new Title(),
          new Doc(),
          new Placeholder({
            showOnlyCurrent: false,
            emptyNodeText: node => {
              if (node.type.name === 'title') {
                return 'Untitled'
              }
            }
          }),
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
          new TrailingNode({
            node: 'paragraph',
            notAfter: ['paragraph'],
          }),
        ],
        onUpdate: ({ getJSON }) => {
          this.json = getJSON()
        }
      }),
      json: 'this should be a json',
      result: '',
      tasks: [],
      preview: false
    }
  },
  mounted() {
    console.log('App mounted!');
    if (localStorage.getItem('tasks')) this.tasks = JSON.parse(localStorage.getItem('tasks'));
  },
  watch: {
    tasks: {
      handler(){
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
      },
      deep: true
    }
  },
  methods: {
    jsonToHtml: function() {
      const Renderer = require("prosemirror-to-html-js").Renderer;
      const renderer = new Renderer();

      renderer.addNode(TitleToHtml)

      this.result = renderer.render(this.json)

      return this.result
    },
    saveTask: function() {
      this.tasks.push(this.json);
      this.preview = true
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>

<style lang="scss">
  @import "../assets/sass/main.scss";

  .editor *.is-empty:nth-child(1)::before,
  .editor *.is-empty:nth-child(2)::before {
    content: attr(data-empty-text);
    float: left;
    color: #aaa;
    pointer-events: none;
    height: 0;
  }

  .editor{
    .awesome-blockquote{
      color: white
    }
  }

  .ProseMirror:focus {
    outline: none;
  }
</style>