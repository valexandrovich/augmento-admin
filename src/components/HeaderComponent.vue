<script setup lang="ts">
import {ref} from "vue";

const isMenuOpen = ref(false)
</script>

<template>
  <div  class="flex flex-row justify-between p-4 md:p-8 items-center">
      <img src="../assets/img/logo.svg" alt="" class="h-[12px] md:h-[24px]">
    <div>
      <nav class="hidden md:flex flex-row gap-12">
        <router-link to="/" class="hover:text-gray-400">Dashboard</router-link>
        <router-link to="/contact" class="hover:text-gray-400">Contact</router-link>
        <router-link to="/account" class="hover:text-gray-400 whitespace-nowrap">My account</router-link>
      </nav>

      <button @click="isMenuOpen = !isMenuOpen" class="md:hidden" style="font-size: 15px; font-weight: 700">
        <span v-if="!isMenuOpen">Menu</span>
        <span v-if="isMenuOpen">Close <span class="text-gray-400">X</span></span>
      </button>
      <div v-if="isMenuOpen" class="flex flex-col md:hidden gap-1 mt-1">
        <router-link to="/" class="hover:text-gray-400">Dashboard</router-link>
        <router-link to="/contact" class="hover:text-gray-400">Contact</router-link>
        <router-link to="/account" class="hover:text-gray-400 whitespace-nowrap">My account</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>