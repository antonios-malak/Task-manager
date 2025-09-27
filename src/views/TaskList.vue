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
        <!-- Loading State -->
        <div
          v-if="taskStore.loading && taskStore.tasks.length === 0"
          class="flex justify-center items-center py-20"
        >
          <LoadingSpinner text="Loading tasks..." />
        </div>

        <!-- Empty State -->
        <div v-else-if="taskStore.tasks.length === 0" class="text-center py-20">
          <div
            class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              ></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            No tasks found
          </h3>
          <p class="text-gray-500 mb-6">Add a new task to get started!</p>
          <button
            @click="router.push({ name: 'AddTask' })"
            class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Create Your First Task
          </button>
        </div>

        <!-- Task Grid -->
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <TaskCard
            v-for="task in taskStore.tasks"
            :key="task.id"
            :task="task"
          />
        </div>

        <!-- Load More Button -->
        <div
          v-if="taskStore.pagination.hasMore && !taskStore.loading"
          class="text-center mt-8"
        >
          <button
            @click="loadMoreTasks"
            class="bg-gray-100 hover:bg-red-500 text-red-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            + Load More Tasks
          </button>
        </div>

        <!-- Loading More -->
        <div
          v-if="taskStore.loading && taskStore.tasks.length > 0"
          class="text-center mt-8"
        >
          <LoadingSpinner text="Loading more tasks..." />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { useRouter } from "vue-router";
  import { useTaskStore } from "@/stores/taskStore";
  import SidebarFilters from "@/components/SidebarFilters.vue";
  import TaskCard from "@/components/TaskCard.vue";
  import LoadingSpinner from "@/components/LoadingSpinner.vue";
  import MenuIcon from "@/assets/icons/MenuIcon.vue";

  const router = useRouter();
  const taskStore = useTaskStore();

  // Sidebar state
  const isSidebarOpen = ref(false);

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };

  const closeSidebar = () => {
    isSidebarOpen.value = false;
  };

  onMounted(() => {
    taskStore.fetchTasks();
  });

  const loadMoreTasks = () => {
    taskStore.loadMoreTasks();
  };
</script>
