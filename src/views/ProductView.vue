<script setup lang="ts">

import frameBlack from "@/assets/img/frames/black.jpg";
import frameBlackWood from "@/assets/img/frames/blackWood.jpg";
import frameWhite from "@/assets/img/frames/white.jpg";
import frameOak from "@/assets/img/frames/oak.jpg";
import frameDarkWood from "@/assets/img/frames/darkWood.jpg";
import frameGold from "@/assets/img/frames/gold.jpg";


import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";

const productId = ref<any>(null);

const route = useRoute();

const fileInput = ref<HTMLInputElement | null>(null);
import * as THREE from "three";
import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";

const state = reactive<{
  thumbnailFile: any,
  thumbnailFileType: any,
  thumbnailFileData: any,
  selectedFrame: any,
  gltfUrl: string
}>({
  thumbnailFile: null,
  thumbnailFileType: '',
  thumbnailFileData: '',
  selectedFrame: null,
  gltfUrl: ''
})


onMounted(() => {
  console.log('Mounted')
  console.log(route.params.id)

  if (route.name == 'product-edit') {
    productId.value = route.params.id;
    console.log('edit')
  } else if (route.name == 'product-create') {
    console.log('new')
  }

})

const openFileDialog = () => {
  fileInput.value?.click();
};

const selectFrame = (frame: object) => {
  state.selectedFrame = frame
}

const frames = [
  {
    name: "No frame",
    option: null,
  },
  {
    name: "Black",
    option: frameBlack,
  },
  {
    name: "Black Wood",
    option: frameBlackWood,
  },
  {
    name: "White",
    option: frameWhite,
  },
  {
    name: "Oak",
    option: frameOak,
  },
  {
    name: "Dark Wood",
    option: frameDarkWood,
  },
  {
    name: "Gold",
    option: frameGold,
  },
]


const handleThumbnail = (event: InputEvent) => {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files.length > 0) {
    state.thumbnailFile = (event.target as HTMLInputElement).files?.[0]
    state.thumbnailFileType = state.thumbnailFile.name.match(/\.[0-9a-z]+$/i)[0];
    const reader = new FileReader();
    reader.onload = (e : any) => {
      state.thumbnailFileData = e.target.result
      imageToModel(state.thumbnailFileData)
    }
    reader.readAsDataURL(state.thumbnailFile);





  }

  const imageToModel = (fileData : any) => {

    const image = new Image();
    image.src = fileData;

    image.onload = () => {
      const texture = new THREE.Texture(image);
      let w_temp = 0;
      let h_temp = 0;

      let thickness_frame_temp = 5 / 100;
      let thickness_temp = 5 / 100;

      const geometry = new THREE.BoxGeometry(w_temp / 100, h_temp / 100, 0.001);

      const material = new THREE.MeshPhysicalMaterial({
        envMapIntensity: 0.4,
        map: texture,
        metalness: 0.3,
        clearcoatRoughness: 0,
        clearcoat: 1,
      });

      const mesh = new THREE.Mesh(geometry, material);
      const gltfExporter = new GLTFExporter();

      const frameGeometry = new THREE.BoxGeometry(
          w_temp / 100 + 5 / 100,
          h_temp / 100 + 5 / 100,
          thickness_frame_temp
      );

      const frameMaterial = new THREE.MeshPhysicalMaterial({
        envMapIntensity: 0.4,
        map: null,
        clearcoatRoughness: 1,
        metalness: 0.3,
      });

      const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
      frameMesh.position.set(0, 0, -thickness_frame_temp * 0.5);
      let frame = [mesh, frameMesh];


      gltfExporter.parse(
          frame,

          (gltf) => {
            const gltfUrl  = URL.createObjectURL(
                new Blob([JSON.stringify(gltf)], { type: "model/gltf+json" })
            );

            gltfToBlob(gltfUrl);

            state.gltfUrl = gltfUrl;
          },
          { binary: true }
      );
    }

  }

  const gltfToBlob = (model) => {
    fetch(model)
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
          const blobModel = new Blob([buffer], { type: "model/gltf-binary" });
        })
        .catch((error) => console.error(error));
  }



}

</script>

<template>

  <div class="flex flex-col p-12">




    <div class="flex flex-row">

      {{state}}
      <h1 class="text-2xl font-semibold ">Add / Edit product</h1>
    </div>
    <div class="flex flex-col md:flex-row   mb-12 ">
      <div class="flex flex-1 flex-col mt-4 md:mr-12">
        <h3>Title</h3>
        <input type="text">
      </div>
      <div class="flex flex-1  flex-col  mt-4">
        <h3>Status</h3>
        <div class="flex flex-row flex-1 flex-wrap gap-5">
          <select>
            <option>Online</option>
            <option>Offline</option>
          </select>
          <button>Preview</button>
          <button>Request model service</button>
          <button class="bg-red-100 text-red-600 hover:bg-red-200">Delete product</button>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row">
      <div class="flex flex-1 flex-col">
        <h3>Thumbnail</h3>
        <div class="flex flex-col md:flex-row">
          <div class="flex flex-col flex-1">
            <div class="">
              <input type="file" accept="image/*" class="hidden" ref="fileInput" @change="handleThumbnail">

              <img v-if="state.thumbnailFileData" :src="state.thumbnailFileData" alt="" class="w-full h-full">
              <div v-else> Pick up file</div>
            </div>
            <button @click="openFileDialog">Replace thumbnail</button>
          </div>
          <div class="flex flex-col flex-1">
            <span class="font-semibold">Product placement</span>
            <div>
              <label>
                <input type="radio" name="placement" value="floor"> Floor
              </label>
              <label>
                <input type="radio" name="placement" value="wall"> Wall
              </label>
            </div>
            <div>
              <span>Artwork size (longest size)</span>
            </div>
            <div class="flex flex-row items-center">
              <input type="text"> <span class="ml-3">sm</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-1 flex-col ">
        <h3>Preview of 3D model</h3>
        <div class="flex bg-white rounded-lg p-12 justify-center items-center align-middle">
          <model-viewer
              v-if="state.gltfUrl"
              :src="state.gltfUrl"
               alt="Description of 3D model" ar
                        poster="/augmento-admin/src/assets/bull.jpeg"
                        ar-modes="webxr scene-viewer quick-look" auto-rotate camera-controls></model-viewer>
        </div>
      </div>
    </div>


    <div class="flex flex-col">
      Select frame
      <div class="flex flex-row   flex-nowrap overflow-x-scroll">
        <div v-for="f in frames" :key="f.name" class="frame-container" @click="selectFrame(f)"
             :class="state.selectedFrame?.name == f.name ? 'bg-blue-200' : ''"
        >

          <div class="p-2">
            <img v-if="f.option != null" :src="f.option" alt="" class="h-24 hover:border-4 border-2">


            <div v-else class="bg-gray-300 w-24 h-24  items-center align-middle flex   hover:border-2 ">
              <span class="text-gray-500 w-full text-center text-7xl">x</span>
            </div>
          </div>
          <span class="text-center text-xs font-semibold">{{ f.name }}</span>
        </div>


      </div>
    </div>


    <div class="flex flex-row">
      <button class="save-button">Save</button>
    </div>
  </div>
</template>

<style scoped>
.frame-container {

  display: flex;
  flex-direction: column;
  align-items: center;


  width: 100px;
  height: 150px;

  min-width: 100px;
  min-height: 150px;


  cursor: pointer;
}


</style>