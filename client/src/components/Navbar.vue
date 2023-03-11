<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="navbar bg-base-300 fixed top-0 left-0">
    <div class="navbar-start">
      <RouterLink :to="{name: 'home'}" class="btn btn-ghost normal-case text-xl">NodeNote</RouterLink>
    </div>
    <div class="navbar-end">
      <RouterLink to="/login" class="btn btn-primary text-white">Get started</RouterLink>
    </div>
  </div>
</template>
