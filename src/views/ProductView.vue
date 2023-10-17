<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const productId = ref<any>(null);

const route = useRoute();

onMounted(()=>{
  console.log('Mounted')
  console.log(route.params.id)

  if (route.name == 'product-edit'){
    productId.value = route.params.id;
    console.log('edit')
  } else if (route.name == 'product-create'){
    console.log('new')
  }

})

</script>

<template>
<div class="p-32">
  Product page
  <p class="text-4xl font-bold">{{productId}}</p>
</div>
</template>

<style scoped>

</style>