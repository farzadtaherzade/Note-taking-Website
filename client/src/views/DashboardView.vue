<script setup>
import DeleteModal from "../components/DeleteModal.vue";
import { useStoreNotes } from "../stores/note";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const notesStore = useStoreNotes();

const activeClasses = ref("border-l-4 border-l-primary border-b border-b-gray-500");
const currentParams = ref(route.params.id);
const lastId = ref(currentParams);
const openModal = ref(true);

onMounted(() => {
  notesStore.getNotes();
  if (currentParams.value) {
    notesStore.getNote(currentParams.value);
  }
});

watch(
  () => route.params.id,
  (id) => {
    currentParams.value = id;
    if (!currentParams.value) lastId.value = id;
    if (route.name == "single note") notesStore.getNote(currentParams.value);
  }
);

watch(() => openModal.value, () => {
  notesStore.getNotes();
  
})
watch(() => notesStore.$state.note, () => {
  if(!notesStore.$state.note) {
    router.push({
    name: "dashboard",
  });
  }
})

const changeRoute = (id) => {
  router.push({
    name: "single note",
    params: {
      id,
    },
  });
  return;
};

const showModel = () => {
  openModal.value = false
  console.log(openModal.value)
};
</script>

<template>
  <DeleteModal v-model="openModal" :id="notesStore.note._id" @hideModal="openModal = true" v-if="!openModal" />
  
  <div class="lg:overflow-hidden">
    <main class="container mx-auto pt-[7.1rem] lg:overflow-hidden">
      <div class="grid grid-cols-12 gap-10 h-[48rem]">
        <div
          class="h-full bg-base-300 p-12 shadow-2xl shadow-slate-700 rounded-2xl col-span-12  lg:block scroll-smooth overflow-y-scroll"
          :class="[
            !notesStore.note ? 'lg:col-span-12' : 'lg:col-span-4',
            currentParams ? 'hidden' : 'lg:block lg:col-span-12',
          ]"
        >
          <div class="w-full px-5 mb-10">
            <h2 class="text-3xl text-white font-bold">Note List</h2>
          </div>
          <div v-for="note in notesStore.notes">
            <div
              class="w-full bg-base-100 text-white p-5 rounded-lg mb-5"
              @click="changeRoute(note._id)"
              :class="[lastId === note._id ? activeClasses : '']"
            >
              <span class="text-lg font-bold"> {{ note.title }} </span>
              <p class="mt-5 text-base font-normal text-gray-200">
                {{ note.description }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="h-full bg-base-300 px-16 py-12 shadow-2xl shadow-slate-700 rounded-2xl relative col-span-12 lg:col-span-8"
          :class="{hidden : !currentParams}"
          v-if="notesStore.note"
        >
          <h1 class="text-4xl mb-10 text-white font-bold z-50">{{ notesStore.note.title }}</h1>
          <span class="text-gray-400">Last Update: {{ notesStore.note.updatedAt }}</span>
          <div class="mt-10">
            <p>
              {{ notesStore.note.description }}
            </p>
          </div>
          <div class="absolute top-0 right-0 btn-group btn-group-horizontal">
            <span class="btn btn-error text-white" @click="showModel">DELETE</span>
            <span class="btn btn-info text-white">EDIT</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px transparent;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ff9800;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}
</style>
