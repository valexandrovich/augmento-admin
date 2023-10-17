<script setup lang="ts">


import {ref, onMounted} from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css'

const codeBlock = ref(null);

onMounted(() => {
  if (codeBlock.value) {
    hljs.highlightElement(codeBlock.value);
  }
})

const copyCode = () => {
  navigator.clipboard.writeText(codeBlock.value.textContent)
}
</script>

<template>
  <div class="flex flex-col mb-8">
    <div class="flex flex-col md:flex-row  px-8 mt-12">
      <div class=" md:w-7/12">

        <span class="text-2xl font-bold">My projects</span>

        <div class="flex flex-col md:flex-row md:flex-wrap gap-5 mt-4">

          <div
              class="bg-white py-6 px-24 flex flex-col items-center rounded-lg shadow-lg hover:bg-gray-200 hover:cursor-pointer">
            <span class="text-2xl font-semibold whitespace-nowrap">Project Title</span>
            <span class="mt-4">50 products</span>
          </div>
          <div
              class="bg-white py-6 px-24 flex flex-col items-center rounded-lg shadow-lg hover:bg-gray-200 hover:cursor-pointer">
            <span class="text-2xl font-semibold whitespace-nowrap">Project Title</span>
            <span class="mt-4">50 products</span>
          </div>
          <div
              class="bg-white py-6 px-24 flex flex-col items-center rounded-lg shadow-lg hover:bg-gray-200 hover:cursor-pointer">
            <span class="text-2xl font-semibold whitespace-nowrap">Project Title</span>
            <span class="mt-4">50 products</span>
          </div>


        </div>

      </div>
      <div class="md:w-5/12 md:max-w-[512px] mt-12 md:mt-0 md:pl-12">
        <span class="text-2xl font-bold">My plan</span>
        <div class="bg-gray-200 p-4  mt-4 rounded-xl relative">
          <span class="font-semibold mr-2">Silver plan:</span><span>97/100 products used</span>
          <div class="absolute bottom-0 left-0 w-full h-1.5 bg-gray-200 rounded-b-lg overflow-hidden">
            <div class="h-full bg-orange-500 " style="width: 75%;"></div> <!-- Adjust width for progress percentage -->
          </div>
        </div>


      </div>
    </div>


    <div class="flex flex-col md:flex-row  px-8 mt-12">
      <div class=" md:w-7/12">

        <div class="flex flex-row justify-between">
          <span class="text-2xl font-semibold">Integration Set-up</span>
          <div class="text-sm">
            <span class="text-gray-500 mr-2">Status</span>
            <span class="bg-green-200 p-2 text-green-800 rounded-lg">ONLINE</span>
          </div>
        </div>

        <div class="relative">
          <a @click="copyCode"  class="cursor-pointer absolute text-gray-700 underline hover:text-gray-400" style="top: 30px; right: 20px">Copy</a>
    <pre>
      <code ref="codeBlock" class="javascript">
        function hello() {
          console.log('Hello, world!');
        }
      </code>
    </pre>
        </div>
      </div>
      <div class="md:w-5/12 md:max-w-[512px] mt-12 md:mt-0 md:pl-12">
        <span class="text-2xl font-bold">Instalation instructions</span>
        <div class="p-4  mt-4 rounded-xl text-gray-600">
          <p><b>1. Backup: </b>Always create a backup of your website first.</p>
          <p><b>2. Access Code:</b>
            <ul style="list-style-type: circle">
              <li>For CMS (e.g., WordPress): Go to your theme's editor.</li>
              <li>For custom sites: Open the desired HTML file.</li>
            </ul>
          </p>
          <p><b>3. Find the Spot: </b>Decide where you want the feature (e.g., within head> or before body>).</p>
          <p><b>4. Copy & Paste: </b>Copy the Augmento snippet and paste it into the chosen spot.</p>
          <p><b>5. Save: </b>Update the changes.</p>
          <p><b>6. Test: </b>Visit your site to ensure the snippet works.</p>
          <p><b>Issues? </b>Double-check code placement or contact Augmento support.</p>

        </div>


      </div>
    </div>


  </div>
</template>

<style scoped>

</style>