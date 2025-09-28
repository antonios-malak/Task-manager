<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <router-link to="/">
            <h1 class="text-2xl font-bold text-gray-900">
              Ta<span class="text-red-500">sk Ma</span>nager
            </h1>
          </router-link>
          <!-- Mobile Menu Button -->
          <button
            @click="toggleSidebar"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <MenuIcon v-if="!isSidebarOpen" class="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>

    <div class="flex relative">
      <!-- Mobile Overlay -->
      <div
        v-if="isSidebarOpen"
        @click="closeSidebar"
        class="fixed inset-0 bg-transparent backdrop-blur-md bg-opacity-50 z-40 md:hidden"
      ></div>

      <!-- Sidebar -->
      <aside
        :class="[
          'w-80 bg-white shadow-lg min-h-screen p-6 transition-transform duration-300 ease-in-out',
          'md:relative md:translate-x-0',
          isSidebarOpen
            ? 'fixed inset-y-0 left-0 z-50 translate-x-0'
            : 'fixed inset-y-0 left-0 z-50 -translate-x-full',
        ]"
      >
        <SidebarFilters @closeSidebar="closeSidebar" />
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SidebarFilters from "@/components/SidebarFilters.vue";
import MenuIcon from "@/assets/icons/MenuIcon.vue";

// Sidebar state
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};
</script>
