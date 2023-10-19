<script setup lang="ts">

import frameBlack from "@/assets/img/frames/black.jpg";
import frameBlackWood from "@/assets/img/frames/blackWood.jpg";
import frameWhite from "@/assets/img/frames/white.jpg";
import frameOak from "@/assets/img/frames/oak.jpg";
import frameDarkWood from "@/assets/img/frames/darkWood.jpg";
import frameGold from "@/assets/img/frames/gold.jpg";

const frames: Frame[] = [
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


import {onMounted, reactive, ref, watch} from "vue";
import {useRoute} from "vue-router";

const productId = ref<any>(null);

const route = useRoute();

const fileInput = ref<HTMLInputElement | null>(null);
import * as THREE from "three";
import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";
import type {Frame} from "@/models/Product";

const state = reactive<{
  thumbnailFile: File | null,
  thumbnailFileType: string,
  thumbnailFileData: ArrayBuffer,
  selectedFrame: Frame,
  gltfUrl: string,
  isGlass: boolean,

  placement: string,
  artworkMaxSide: string,

  frameThick: number
  frameDepth: number
  artWorkMaxSize: number


}>({
  thumbnailFile: null,
  thumbnailFileType: '',
  thumbnailFileData: '',
  selectedFrame: null,
  gltfUrl: '',
  isGlass: true,
  placement: 'wall',
  artworkMaxSide: 'height',
  frameThick: 3,
  frameDepth: 1,
  artWorkMaxSize: 50
})


onMounted(() => {
  if (route.name == 'product-edit') {
    productId.value = route.params.id;
  } else if (route.name == 'product-create') {
    // console.log('new')
  }

})

const openFileDialog = () => {
  fileInput.value?.click();
};


const handleThumbnail = (event: InputEvent) => {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files.length > 0) {
    state.thumbnailFile = (event.target as HTMLInputElement).files?.[0]

    console.log(state.thumbnailFile)

    state.thumbnailFileType = state.thumbnailFile.name.match(/\.[0-9a-z]+$/i)[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      state.thumbnailFileData = e.target.result
      refreshModel()
    }
    reader.readAsDataURL(state.thumbnailFile);
  }
}

const loadImage: Image = async (imageData: ArrayBuffer) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageData;
    img.onload = () => {
      resolve(img)
    };
    img.onerror = reject;

  });
}

const gltfToBlob = (model) => {
  fetch(model)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const blobModel = new Blob([buffer], {type: "model/gltf-binary"});
      })
      .catch((error) => console.error(error));
}

watch(() => state.frameThick, (newValue, oldValue) => {
  refreshModel()
});

watch(() => state.artWorkMaxSize, (newValue, oldValue) => {
  refreshModel()
});

watch(() => state.frameDepth, (newValue, oldValue) => {
  refreshModel()
});

watch(() => state.isGlass, (newValue, oldValue) => {
  refreshModel()
});


const refreshModel = async () => {
  const artworkImage = await loadImage(state.thumbnailFileData);
  let frameImage = null
  if (state.selectedFrame != null && state.selectedFrame.option != null) {
    frameImage = await loadImage(state.selectedFrame.option)
  }

  const longerSide = artworkImage.height > artworkImage.width ? 'height' : 'width'
  const hCof = artworkImage.height / artworkImage.width
  const wCof = artworkImage.width / artworkImage.height

  let artX
  let artY

  if (longerSide === 'height') {
    artY = state.artWorkMaxSize
    artX = wCof * artY
  } else {
    artX = state.artWorkMaxSize
    artY = hCof * artX
  }

  // let artX = artworkImage.width
  // let artY  = artworkImage.height


  // if (artY > 200){
  //   artY = 200
  //   artX = artY * wCof
  // } else if (artX > 200){
  //   artX = 200
  //   artY = artX * hCof
  // }
  //
  const artZ = 1
  const frameThick = state.frameThick
  const frameDepth = state.frameDepth
  //
  console.log('artX ' + artX)
  console.log('artY ' + artY)


  const texture = new THREE.Texture(artworkImage);
  const geometry = new THREE.BoxGeometry(
      artX / 100,
      artY / 100,
      !state.selectedFrame?.option ? artZ / 100 : 0.001
  );
  const material = new THREE.MeshPhysicalMaterial({
    envMapIntensity: 0.4,
    map: texture,
    metalness: 0.3,
    clearcoatRoughness: state.isGlass ? 0 : 1,
    clearcoat: state.isGlass ? 1 : 0,
  });
  const mesh = new THREE.Mesh(geometry, material);


  const frameTexture = frameImage != null ? new THREE.Texture(frameImage) : null

  const frameGeometry = new THREE.BoxGeometry(
      artX / 100 + frameThick / 100,
      artY / 100 + frameThick / 100,
      frameDepth / 100
  );

  const frameMaterial = new THREE.MeshPhysicalMaterial({
    envMapIntensity: 0.4,
    map: frameTexture ? frameTexture : null,
    clearcoatRoughness: 1,
    metalness: 0.3,
  });

  const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
  frameMesh.position.set(0, 0, frameDepth / -100 * 0.5);

  let frame = !frameTexture ? mesh : [mesh, frameMesh];


  const gltfExporter = new GLTFExporter();
  gltfExporter.parse(
      frame,

      (gltf) => {
        const gltfUrl = URL.createObjectURL(
            new Blob([JSON.stringify(gltf)], {type: "model/gltf+json"})
        );

        gltfToBlob(gltfUrl);

        state.gltfUrl = gltfUrl;
      },
      {binary: true}
  );

}

// const loadFrame = () => {
//   const image = new Image();
//   if (state.selectedFrame.option == null) {
//     ima
//   } else {
//     console.log('has frame')
//   }
// }

const selectFrame = (frame: object) => {
  state.selectedFrame = frame
  refreshModel()
}


const _handleThumbnail = (event: InputEvent) => {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files.length > 0) {
    state.thumbnailFile = (event.target as HTMLInputElement).files?.[0]
    state.thumbnailFileType = state.thumbnailFile.name.match(/\.[0-9a-z]+$/i)[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      state.thumbnailFileData = e.target.result
      imageToModel()
    }
    reader.readAsDataURL(state.thumbnailFile);


  }


  const imageToModel = () => {


    const artX = 111
    const artY = 35
    const artZ = 10 / 100

    const artImage = new Image();
    artImage.src = state.thumbnailFileData;

    artImage.onload = () => {
      const texture = new THREE.Texture(artImage);
      const geometry = new THREE.BoxGeometry(artX / 100, artY / 100, 0.001);
      const material = new THREE.MeshPhysicalMaterial({
        envMapIntensity: 0.4,
        map: texture,
        metalness: 0.3,
        clearcoatRoughness: state.isGlass ? 0 : 1,
        clearcoat: state.isGlass ? 1 : 0,
      });
      const mesh = new THREE.Mesh(geometry, material);
      const gltfExporter = new GLTFExporter();
      gltfExporter.parse(
          mesh,

          (gltf) => {
            const gltfUrl = URL.createObjectURL(
                new Blob([JSON.stringify(gltf)], {type: "model/gltf+json"})
            );

            gltfToBlob(gltfUrl);

            state.gltfUrl = gltfUrl;
          },
          {binary: true}
      );
    }


    // const geometry = new THREE.BoxGeometry(artX / 100, artY / 100, 0.001);
    //
    // const material = new THREE.MeshPhysicalMaterial({
    //   envMapIntensity: 0.4,
    //   map: texture,
    //   metalness: 0.3,
    //   clearcoatRoughness: state.isGlass ? 0 : 1,
    //   clearcoat: state.isGlass ? 1 : 0,
    // });
    //
    // const mesh = new THREE.Mesh(geometry, material);
    //
    // const gltfExporter = new GLTFExporter();
    // gltfExporter.parse(
    //     mesh,
    //
    //     (gltf) => {
    //       const gltfUrl  = URL.createObjectURL(
    //           new Blob([JSON.stringify(gltf)], { type: "model/gltf+json" })
    //       );
    //
    //       gltfToBlob(gltfUrl);
    //
    //       state.gltfUrl = gltfUrl;
    //     },
    //     { binary: true }
    // );


    //
    //
    // const frameTexture = new THREE.Texture(frames[1].option)
    //
    // const frameGeometry = new THREE.BoxGeometry(
    //     111 / 100 + 11 / 100,
    //     55 / 100 + 11 / 100,
    //     5
    // );
    //
    // const frameMaterial = new THREE.MeshPhysicalMaterial({
    //   envMapIntensity: 0.4,
    //   map: frameTexture,
    //   clearcoatRoughness: 1,
    //   metalness: 0.3,
    // });
    //
    // const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
    // frameMesh.position.set(0, 0, -thickness_frame_temp * 0.5);


  }


}

</script>

<template>

  {{ state.placement }}

  <div class="flex flex-col p-12">


    <div class="flex flex-row">

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
          <div class="flex flex-col flex-1 p-4">
            <div class="mb-2">
              <input type="file" accept="image/*" class="hidden" ref="fileInput" @change="handleThumbnail">

              <img v-if="state.thumbnailFileData" :src="state.thumbnailFileData" alt="" class="w-full h-full">
              <div v-else
                   class=" p-12 outline outline-2 outline-gray-300 outline-dashed text-center text-gray-500 font-semibold capitalize cursor-pointer hover:bg-gray-200"
                   @click="openFileDialog"> Pick up file
              </div>
            </div>
            <button @click="openFileDialog" v-if="state.thumbnailFileData">Replace thumbnail</button>
          </div>
          <div class="flex flex-col flex-1 p-4" v-if="state.thumbnailFile">
            <span class="font-semibold text-sm">Product placement</span>
            <div>
              <label class="text-sm mr-2">
                <input type="radio" name="placement" value="wall" v-model="state.placement" > Wall
              </label>
              <label class="text-sm">
                <input type="radio" name="placement" value="floor" v-model="state.placement"> Floor
              </label>
            </div>
            <div class="mt-2">
              <span class="font-semibold text-sm">Artwork size (longest size)</span>
            </div>
            <div class="flex flex-row items-center">
              <input type="text" v-model="state.artWorkMaxSize"> <span class="ml-3">sm</span>
            </div>
            <div class="flex flex-row mt-2">
              <span class="mr-4 font-semibold text-sm">Add glass</span>
              <input type="checkbox" v-model="state.isGlass">
            </div>

            <div class="mt-2">
              <span class="font-semibold text-sm">Frame wide</span>
            </div>
            <div class="flex flex-row items-center">
              <input type="text" v-model="state.frameThick"> <span class="ml-3">sm</span>
            </div>


            <div class=" mt-2">
              <span class="font-semibold text-sm">Frame depth</span>
            </div>
            <div class="flex flex-row items-center">
              <input type="text" v-model="state.frameDepth"> <span class="ml-3">sm</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-1 flex-col " v-if="state.thumbnailFileData">
        <h3>Preview of 3D model</h3>
        <div class="flex bg-white rounded-lg p-2  justify-center items-center align-middle  relative ">


          <model-viewer
              v-if="state.gltfUrl"
              :src="state.gltfUrl"
              style="min-height: 300px; width: 100%;"
              ar
              shadow-intensity="3"
              shadow-softness="1"
              camera-controls
              :ar-placement="state.placement"
              auto-rotate
              autoplay
          >

            <button slot="ar-button" class="bg-blue-600 text-white absolute bottom-0 right-0">Show in AR</button>

          </model-viewer>
        </div>
      </div>
    </div>


    <div class="flex flex-col mt-2" v-if="state.thumbnailFile">
      <span class="font-semibold"> Select frame </span>
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