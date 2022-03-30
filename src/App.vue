<script setup lang="ts">
import { ref, onUpdated, nextTick } from 'vue';
import TurndownService from 'turndown'
import { gfm, tables } from '@guyplusplus/turndown-plugin-gfm'

const pastedArea = ref<HTMLDivElement>()
const ts = (new TurndownService()).use([gfm, tables])

// const pasteHandler = (evt: ClipboardEvent) => {
//   console.log(evt)
//   if (evt.clipboardData) {
//     if (evt.clipboardData.types.includes('text/html')) {
//       console.log(pastedArea.value?.innerHTML)
//       if (pastedArea.value?.innerHTML) {
//         console.log('result')
//         console.log(ts.turndown(pastedArea.value?.innerHTML))
//         // mdt.value = ts.turndown(pastedArea.value?.innerHTML)
//       }
//     }
//   }
// }

const mdt = ref()

const changed = () => {
 if (pastedArea.value?.innerHTML) {
   mdt.value = ts.turndown(pastedArea.value?.innerHTML)
  }
}
</script>

<template>
  <div
    class="pastedarea"
    ref="pastedArea"
    contenteditable="true"
    @input="changed"
  ></div>
  <pre>{{ mdt }}</pre>
</template>

<style>
html, body {
  height: 100%;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.pastedarea {
  height: 30%;
  width: 100%;
  text-align: left;
  border: solid 1px #000000;
  padding: 2px 2px 2px 2px;
  overflow-y: scroll;
}
</style>
