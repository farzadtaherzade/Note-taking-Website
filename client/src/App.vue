<script setup>
import { RouterView, useRoute } from "vue-router";
import DashNavbar from "./components/DashNavbar.vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { useStoreAuth } from "./stores/auth";
import { onMounted } from "vue";

const authStore = useStoreAuth()

onMounted(()=> {
  authStore.initialUser()
})

const route = useRoute();
</script>

<template>
  <div class="">
    <Navbar v-if="route.name == 'home'" />
    <DashNavbar v-else />
    <RouterView />
    <Footer v-if="route.name == 'home'" />
  </div>
</template>

<style scoped></style>
