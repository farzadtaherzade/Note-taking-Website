import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";

export const useStoreNotes = defineStore("notes", {
  state: () => {
    return {
      note: null,
      notes: [],
    };
  },
  getters: {},
  actions: {
    async getNotes() {
      const notes = await axios.get("/note/find-note");
      this.notes = notes.data.notes;
    },
    async getNote(id) {
      const note = await axios.get(`/note/find-note/${id}`);
      this.note = note.data.note;
    },
    async deleteNote(id) {
      const note = await axios
        .delete(`/note/delete-note/${id}`)
        .catch((err) => {
          if (err) {
            console.log("err:", err);
          }
        });

      this.note = null;
      this.getNotes();
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreNotes, import.meta.hot));
}
