import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";

export const useStoreAuth = defineStore("auth", {
  state: () => {
    return {
      firstname: "",
      lastname: "",
      image: "",
      isLogin: false,
      token: null,
    };
  },
  getters: {
    profileImage: (state) => {
      if (!state.image && state.isLogin) {
        return state.firstname[0] + state.lastname[0];
      } else if (state.isLogin) {
        return state.image;
      }
    },
  },
  actions: {
    async initialUser() {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["authorization"] = `bearer ${token}`;
        this.myProfile();
      } else {
        this.isLogin = false;
        this.token = null;
        localStorage.removeItem("token");
      }
    },
    async loginUser(payload) {
      const user = await axios.post("/auth/login", payload);
      const { token } = user.data.user;
      this.token = token;
      localStorage.setItem("token", this.token);
      this.initialUser();
    },
    async registerUser(payload) {},
    async myProfile() {
      const user = await axios.get("/user/me");
      const { token, firstname, lastname, profile_image } = user.data.user;
      this.isLogin = true;
      this.token = token;
      this.firstname = firstname;
      this.lastname = lastname;
      this.image = profile_image;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreAuth, import.meta.hot));
}
