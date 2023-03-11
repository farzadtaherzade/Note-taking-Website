<script setup>
import { ref , reactive} from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useStoreAuth } from "../stores/auth";

const userAuth = useStoreAuth()

const eyeOpen = ref(false);
const type = ref("password");
const router = useRouter()

const userData = reactive({
  email: "",
  password: "",
})

function toggleEye() {
  eyeOpen.value = !eyeOpen.value;
  type.value = eyeOpen.value ? "text" : "password";
}

function onSubmit(){
  if(!userData.email|| !userData.password) {
    console.log('pls enter an email and password')
    return 
  }
    userAuth.loginUser(userData)
    router.push({name: 'dashboard'})
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center relative">
    <RouterLink to="/register" class="btn btn-link absolute top-10 right-10"
      >Create An Account</RouterLink
    >
    <div class="container mx-auto max-w-md">
      <h1 class="text-center text-3xl font-bold mb-10">Login To Your Account</h1>
      <form @submit.prevent="onSubmit">
        <div>
          <label for="email" class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            type="email"
            id="email"
            v-model="userData.email"
            class="input input-ghost input-bordered w-full"
          />
        </div>

        <div class="mt-5 relative">
          <label for="password" class="label">
            <span class="label-text">Password</span>
          </label>
          <input
            :type="type"
            id="password"
            v-model="userData.password"
            class="input input-ghost input-bordered w-full"
          />
          <span class="absolute right-2 top-12">
            <v-icon
              class="cursor-pointer"
              name="bi-eye-fill"
              v-if="!eyeOpen"
              @click="toggleEye"
            ></v-icon>
            <v-icon
              class="cursor-pointer"
              name="bi-eye-slash-fill"
              v-if="eyeOpen"
              @click="toggleEye"
            ></v-icon>
          </span>
        </div>
        <input type="submit" value="LOGIN" class="btn btn-block btn-primary mt-10" />
      </form>
    </div>
  </div>
</template>
