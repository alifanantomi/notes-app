<template>
  <div class="editor px-3">
    <v-app-bar flat fixed height="52">
      <v-btn icon link to="/"><v-icon>mdi-chevron-left</v-icon></v-btn>
      <v-spacer></v-spacer>
      <span class="text-body-1">{{ Task[this.index].title }}</span>
      <v-spacer></v-spacer>
      <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list class="py-1 px-0">
            <v-list-item class="px-4">
              <v-list-item @click="taskRemove" link class="py-0 px-0">
                Delete task
              </v-list-item>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-app-bar>

    <div class="editor__page-control d-flex justify-start align-center">
      <v-btn @click="sheet = !sheet" text class="text-none text-body-2 px-2" color="rgba(255, 255, 255, 0.4)">
        <v-icon left class="mr-1">mdi-image</v-icon>
        <div v-if="setCategories">
          {{ setCategories }}
        </div>
        <div v-else>
          Add categories
        </div>
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
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })">
          <v-icon>mdi-format-header-3</v-icon>
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

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.todo_list() }"
          @click="commands.todo_list">
          <v-icon>mdi-format-list-checks</v-icon>  
        </button>

        <button
          class="menubar__button"
          @click="showImagePrompt(commands.image)">
          <v-icon>mdi-image</v-icon>  
        </button>

      </div>
    </editor-floating-menu>
    
    <editor-content class="editor__content" :editor="editor" />

    <v-bottom-sheet v-model="sheet">
      <v-sheet
        class="text-center"
      >
        <v-btn
          class="mt-6"
          text
          color="red"
          @click="sheet = !sheet"
        >
          close
        </v-btn>
        <div class="py-3">
          <v-list>
            <v-list-item
              v-for="categories in categoriesItems"
              :key="categories.title"
              @click="getCategories(categories.title)"
              v-model="categories.title"
            >
              <v-list-item-title>{{ categories.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <!-- <pre>{{this.result}}</pre> -->

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
  Image,
  TrailingNode,
  Placeholder
} from 'tiptap-extensions'
import Doc from './custom-extensions/Doc'
import Title from './custom-extensions/Title'
import categoriesItems from '@/data/Categories'
import { mapActions, mapState } from 'vuex'

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
          new TodoItem({
            nested: true
          }),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new TrailingNode({
            node: 'paragraph',
            notAfter: ['paragraph'],
          }),
        ],
        onUpdate: ({ getJSON }) => {
          this.json = getJSON()
          this.handleSubmit()
        }
      }),
      formData: {
        id: 0,
        title: '',
        category: '',
        type: 'doc',
        updated_at: ''
      },
      categoriesItems,
      categories: '',
      sheet: false,
      json: '',
      result: {},
      index: 0, //index of array (from params)
      id: 0,  //id task (random number/from database)
    }
  },
  computed: {
    ...mapState([
      'Task'
    ]),

    setCategories: {
      get() {
        const taskCategory = this.Task[this.index].category
        return taskCategory
      },

      // set(value) {
      //   var category = value
      //   this.categories = 
      // }
    }
  },
  created() {
    this.index = this.$route.params.task
    
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'updateTask' || mutation.type === 'removeTask') {
        localStorage.setItem('tasks', JSON.stringify(state.Task))
      }
    })
  },
  watch: {
    $route() {      
      this.index = this.$route.params.task
      this.categories = this.Task[this.index].category
    },
    index: {
      handler() {
        this.result = this.Task[this.index]
        this.editor.setContent(this.result)
      }
    }
  },
  methods: {
    ...mapActions([
      'updateTask',
      'removeTask'
    ]),
    getCategories: function(value) {
      this.categories = value
      this.json = this.editor.getJSON()
      this.sheet = false
      this.handleSubmit()
    },
    handleSubmit: function() {
      const hasContent = Object.prototype.hasOwnProperty.call(this.json.content[0], 'content')

      if (hasContent) {
        let contentTitle = this.json.content[0].content[0].text
        let content = this.json.content
        
        this.formData.id = this.Task[this.index].id
        this.formData.title = contentTitle
        this.formData.category = this.categories
        this.formData.updated_at = Date.now()

        const { id, title, category, type, updated_at} = this.formData
        const payload = {
          id, 
          title,
          category,
          content,
          type,
          updated_at
        }
        this.updateTask(payload)
      }

      // console.log(payload.title.replace(/\W+/g, '-'));
      // this.$router.push({name: 'Task', params: {task: payload.title.replace(/\W+/g, '-')}})
    },

    taskRemove() {
      const index = this.index
      
      this.removeTask(index)
      this.$router.push('/')
    },

    showImagePrompt(command) {
      const srcImage = prompt('Enter the Url of your image here')
      if (srcImage !== null) {
        command({srcImage})
      }
    },

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