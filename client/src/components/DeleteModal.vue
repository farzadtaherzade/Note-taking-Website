<script setup>
import { useStoreNotes } from '../stores/note';

const notesStore = useStoreNotes()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
  id: {
    type: String,
  },
});

const emit = defineEmits(["hideModal"]);

const handleCloseModal = () => {
  emit("hideModal");
};

const handleDeleteNote = () => {
    notesStore.deleteNote(props.id)
    handleCloseModal()
}

</script>

<template>
  <div
    class="min-h-screen w-full fixed top-0 left-0 flex items-center justify-center z-[9999]"
    style="background-color: rgba(0, 0, 0, 0.4)"
  >
    <div class="modal-open">
      <div class="modal-box w-[27rem] relative">
        <label
          for="my-modal-3"
          class="btn btn-sm btn-circle absolute right-2 top-2"
          @click="handleCloseModal"
          >✕</label
        >
        <h3 class="text-lg font-bold">Delete Note!</h3>
        <p class="py-4">Are you sure you want delete this note?</p>
        <div class="flex gap-2 justify-end">
          <button class="btn btn-outline" @click="handleCloseModal">Cancel</button>
          <button class="btn btn-error text-white" @click="handleDeleteNote">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
