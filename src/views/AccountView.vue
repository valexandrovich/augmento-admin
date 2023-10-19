<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col mb-8">
    <div class="flex flex-col md:flex-row  px-8 mt-12">
      <div class="flex flex-col md:w-7/12">
        <span class="text-2xl font-bold">My account</span>

        <span class="py-4 font-semibold">Company name</span>
        <input type="text" class="outline outline-1 outline-gray-300 rounded-md px-4 py-1 shadow-md mb-4">

        <span class="py-4 font-semibold">Email</span>
        <input type="text" class="outline outline-1 outline-gray-300 rounded-md px-4 py-1 shadow-md mb-4">

        <span class="py-4 font-semibold">Website</span>
        <input type="text" class="outline outline-1 outline-gray-300 rounded-md px-4 py-1 shadow-md mb-4">



      </div>
      <div class="md:w-5/12 md:max-w-[512px] mt-12 md:mt-0 md:pl-12">
        <span class="text-2xl font-bold">My plan</span>
        <div class="bg-gray-200 p-4  mt-4 rounded-xl relative flex flex-col items-center">

          <span class="font-bold text-lg pb-4">Silver plan</span>
          <span class="text-4xl pb-4"><b>97</b>/100</span>
          <span class="text-sm text-gray-500 pb-2">products used</span>

        <div class="absolute bottom-0 left-0 w-full h-1.5 bg-gray-200 rounded-b-lg overflow-hidden">
          <div class="h-full bg-orange-500 " style="width: 75%;"></div> <!-- Adjust width for progress percentage -->
        </div>
      </div>
    <div class="w-full">
      <button class="bg-blue-500  w-full text-white hover:bg-blue-400 py-2 rounded-lg mt-6">Upgrade plan</button>
    </div>
        <div class="w-full text-center  py-2">
          <a href="" class="underline text-gray-500 hover:text-gray-400 text-sm">Downgrade or cancel plan</a>
        </div>

      </div>
    </div>


  </div>
</template>

<style scoped>

</style>