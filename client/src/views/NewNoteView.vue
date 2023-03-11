<script setup>
import axios from "axios";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const note = reactive({
  title: "",
  description: "",
});

async function onSubmit() {
  if (note.title && note.description) {
    const result = await axios.post("/note/create-note", note);
    if (result.status == 201) {
        router.push({
          name: "single note",
          params: {
            id: result.data.result._id,
          },
        });
    }
  }
}
</script>

<template>
  <div class="min-h-screen overflow-hidden pt-32">
    <form class="container mx-auto max-w-2xl" @submit.prevent="onSubmit">
      <div>
        <label for="title" class="label">
          <span class="label-text">Enter A Title</span>
        </label>
        <input
          type="text"
          id="title"
          class="input input-bordered w-full"
          placeholder="Enter a title for your note"
          v-model="note.title"
        />
      </div>

      <div class="mt-7">
        <label for="title" class="label">
          <span class="label-text">Enter A Description</span>
        </label>
        <textarea
          type="text"
          id="title"
          class="textarea textarea-bordered w-full textarea-ghost"
          placeholder="Enter a description for your note"
          v-model="note.description"
        ></textarea>
      </div>
      <input
        type="submit"
        value="Create note"
        class="btn btn-block btn-primary text-white mt-7"
      />
    </form>
  </div>
</template>
