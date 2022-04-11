<script setup lang="ts">
import { ref, onUpdated, nextTick } from 'vue';
import TurndownService from 'turndown'
import { gfm, tables } from '@guyplusplus/turndown-plugin-gfm'
import { NLayout, NLayoutContent, NLayoutHeader, NLayoutFooter, NSpace, NModal } from 'naive-ui'
import c2mSvg from './assets/clipboard2markdown.svg'
import TermOfUse from './components/TermOfUse.vue'
import PrivacyPolicy from './components/PrivacyPolicy.vue'

const pastedArea = ref<HTMLDivElement>()
const ts = (new TurndownService()).use([gfm, tables])

const showToUModal = ref(false)
const showPPModal = ref(false)
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
<n-layout position="absolute">
  <n-layout-header
    style="height: 54px; padding: 10px"
    bordered>
    <h1>CB2Markdown</h1>
  </n-layout-header>
  <n-layout-content position="absolute" style="top: 64px; bottom: 64px"
    content-style="padding: 24px;">
    <img class="mylogo" :src="c2mSvg" alt="my-logo" />
    <div
      class="pastedarea"
      ref="pastedArea"
      contenteditable="true"
      @input="changed"
    ></div>
    <pre>{{ mdt }}</pre>
  </n-layout-content>
  <n-layout-footer
    style="height: 32px; padding: 6px"
    bordered
    position="absolute">
    <n-space>
      <span>©2022</span>
      <a class="hoverlink" @click="() => showPPModal = true">Privacy Policy</a>
      <a lass="hoverlink" @click="() => showToUModal = true">Term of Service</a>
    </n-space>
  </n-layout-footer>
</n-layout>
<n-modal v-model:show="showToUModal">
  <term-of-use />
</n-modal>
<n-modal v-model:show="showPPModal">
  <privacy-policy />
</n-modal>
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
  text-align: left;
  color: #2c3e50;
}

h1 {
  font-size: 24px;
  margin: 0 0 0 0;
}

pre {
  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
}

.mylogo {
  max-width: 300px;
}
.pastedarea {
  height: 30%;
  width: 100%;
  text-align: left;
  border: solid 1px #000000;
  padding: 2px 2px 2px 2px;
  overflow-y: scroll;
}

.hoverlink:hover {
  text-decoration: underline;
}
</style>
