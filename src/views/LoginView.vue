<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col md:flex-row-reverse md:pt-32 mb-8">
    <div class="flex-1 flex  items-start  md:pl-6">
      <img src="@/assets/img/login-banner.png" alt="" class="hidden md:block object-contain">
      <img src="@/assets/img/login-banner-mob.png" alt="" class="block md:hidden w-full mb-4">
    </div>
    <div class="flex-1  items-end flex flex-col  md:pr-6">
      <div class=" w-full md:w-[512px] flex flex-col">
        <span class="font-bold text-xl text-center">Create an account to get started</span>
        <button class="bg-white flex flex-row justify-center py-4 mt-4 rounded-lg hover:bg-gray-200">
          <img src="../assets/img/google-logo.png" class="h-[22px] mr-2.5" alt="">
          <span style="color: #757575; font-family: 'Roboto'; font-weight: 500">
              Sign in with Google
              </span>
        </button>
        <span class="font-light py-8 text-center">Or sign-up with manually</span>
        <div class="flex flex-col bg-white p-8  rounded-md md:w-[512px]">
          <span class="font-semibold text-gray-800 mb-2">Company name</span>
          <input type="text" class="outline outline-1 outline-gray-300 rounded-md px-4 py-1 shadow-md mb-4">
          <span class="font-semibold text-gray-800 mb-2">Email</span>
          <input type="text" class="outline outline-1 outline-gray-300 rounded-md px-4 py-1 shadow-md mb-4">
          <span class="font-semibold text-gray-800 mb-2">Password</span>
          <input type="password" class="outline outline-1 outline-gray-300 rounded-md px-4 py-1 shadow-md mb-4">
          <span class="font-semibold text-gray-800 mb-2">Password again</span>
          <input type="password" class="outline outline-1 outline-gray-300 rounded-md px-4 py-1 shadow-md mb-4">
          <button class="bg-blue-500 text-white hover:bg-blue-400 py-3 rounded-lg mt-6">Sign-up</button>
        </div>


      </div>
    </div>
  </div>
</template>

<style scoped>

</style>