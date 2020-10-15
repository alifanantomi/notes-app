<template>
  <div class="editor px-3">

    <div class="editor__page-control d-flex justify-start align-center">
      <v-btn small text class="text-none text-body-2 px-2" color="rgba(255, 255, 255, 0.4)">
        <v-icon left class="mr-1">mdi-image</v-icon>
        Add cover
      </v-btn>
      <v-btn small text class="text-none text-body-2 px-2" color="rgba(255, 255, 255, 0.4)">
        task index: {{ index }}
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
      </div>
    </editor-floating-menu>
    <editor-content class="editor__content" :editor="editor" />

    <!-- <div class="editor__page-control d-flex justify-start align-center">
      <v-btn text @click="handleSubmit" class="text-none text-body-2 px-2" color="rgba(255, 255, 255, 0.4)">
        Save
      </v-btn>
      <v-btn text @click="preview = !preview" class="text-none text-body-2 px-2" color="rgba(255, 255, 255, 0.4)">
        Preview
      </v-btn>
    </div> -->

  </div>
</template>

<script>
import { Editor, EditorContent, EditorFloatingMenu  } from 'tiptap'
import { Blockquote,
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
import { mapState, mapActions } from 'vuex'

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
      formData: {
        id: 0,
        title: '',
        category: '',
        progress: 0,
        favorite: false,
      },
      // link: this.$route.params.task,
      json: '',
      result: '',
      editable: false,
      preview: false,
      index: 0, //index of array (from params)
      id: 0,  //id task (random number/from database)
    }
  },
  computed: {
    ...mapState([
      'Task'
    ]),
  },
  created() {
    this.index = this.$route.params.task
    
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'updateTask') {
        localStorage.setItem('tasks', JSON.stringify(state.Task))
      }
    })
  },
  watch: {
    $route() {      
      this.index = this.$route.params.task
      // this.id = this.Task[this.index].id
    },
    index: {
      handler() {
        this.jsonToHtml(this.Task[this.index])
      }
    },
    json: {
      handler() {
        this.handleSubmit()
      }
    }
  },
  methods: {
    ...mapActions([
      'updateTask'
    ]),
    jsonToHtml: function(j) {
      const Renderer = require("prosemirror-to-html-js").Renderer;
      const renderer = new Renderer();
      let result

      renderer.addNode(TitleToHtml)

      result = renderer.render(j)

      return this.editor.setContent(result)
    },
    handleSubmit: function() {
      let contentTitle = this.json.content[0].content[0].text
      let content = this.json.content
      
      this.formData.id = this.Task[this.index].id
      this.formData.title = contentTitle
      this.formData.category = '',
      this.formData.progress = 10,
      this.formData.favorite = false

      const { id, title, category, progress, favorite } = this.formData
      const payload = {
        id, 
        title,
        category,
        progress,
        favorite,
        content
      }
      this.updateTask(payload)

      // console.log(payload.title.replace(/\W+/g, '-'));
      // this.$router.push({name: 'Task', params: {task: payload.title.replace(/\W+/g, '-')}})
    }
  },
  beforeDestroy() {
    this.unsubscribe();
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

  .ProseMirror:focus {
    outline: none;
  }
</style>