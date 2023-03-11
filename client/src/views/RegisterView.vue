<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
const eyeOpen = ref(false);
const type = ref("password");

function toggleEye() {
  eyeOpen.value = !eyeOpen.value;
  type.value = eyeOpen.value ? "text" : "password";
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center relative">
    <RouterLink to="/login" class="btn btn-link absolute top-10 right-10"
      >Login To Your Account
    </RouterLink>
    <div class="container mx-auto max-w-md">
      <h1 class="text-center text-3xl font-bold mb-10">Create Your Account</h1>
      <form>
        <div class="flex w-full gap-2">
          <div class="grid h-20 flex-grow card">
            <div>
            <label for="firstname" class="label">
              <span class="label-text">First Name</span>
            </label>
            <input
              type="text"
              id="firstname"
              class="input input-ghost input-bordered w-full"
            />
          </div>
          </div>
          <div class="grid h-20 flex-grow card"><div>
            <label for="lastname" class="label">
              <span class="label-text">Last Name</span>
            </label>
            <input
              type="text"
              id="lastname"
              class="input input-ghost input-bordered w-full"
            />
          </div></div>
        </div>
        <div class="mt-5">
          <label for="email" class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            type="email"
            id="email"
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
        <input type="submit" value="CREATE" class="btn btn-block btn-primary mt-10" />
      </form>
    </div>
  </div>
</template>
