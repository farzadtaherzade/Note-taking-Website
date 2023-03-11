<script setup>
import { useStoreAuth } from "../stores/auth";
import { RouterLink } from "vue-router";

const authStore = useStoreAuth();
</script>

<template>
  <div class="navbar bg-base-300 fixed top-0 left-0 z-[999]">
    <div>
      <RouterLink
      :to="{ name: 'dashboard' }"
      class=" cursor-pointer"
      v-if="$route.name === 'single note'"
    >
      <v-icon name="bi-arrow-left" scale="2" class="cursor-pointer"></v-icon>
    </RouterLink>
    </div>
    <div class="flex-1">
      <RouterLink :to="{ name: 'home' }" class="btn btn-ghost normal-case text-xl"
        >NodeNote</RouterLink
      >
    </div>
    <div class="flex-none gap-2">
      <div>
        <RouterLink :to="{name:'new note'}" class="btn btn-primary hover:text-white btn-outline">Add New Note</RouterLink>
      </div>  
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar placeholder">
          <div class="bg-neutral-focus text-neutral-content rounded-full w-24">
            <span class="text-1xl">{{ authStore.profileImage }}</span>
          </div>
        </label>
        <ul
          tabindex="0"
          class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
        >
          <li style="z-index: 9999">
            <a class="justify-between z-50">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li style="z-index: 999"><a>Settings</a></li>
          <li style="z-index: 999"><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
