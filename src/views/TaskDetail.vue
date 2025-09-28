<template>
  <DefaultLayout>
    <div class="flex items-center ps-6 md:ps-[100px] mt-10">
      <button
        @click="$router.go(-1)"
        class="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
      >
        <BackIcon class="mr-2" />
      </button>
    </div>
      <!-- Loading State -->
      <div
        v-if="taskStore.loading"
        class="flex justify-center items-center py-20"
      >
        <LoadingSpinner text="Loading task details..." />
      </div>

      <!-- Error State -->
      <div v-else-if="taskStore.error" class="text-center py-20">
        <div
          class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <ErrorIcon />
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Error Loading Task
        </h3>
        <p class="text-gray-500 mb-6">{{ taskStore.error }}</p>
        <button
          @click="loadTask"
          class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          Try Again
        </button>
      </div>

      <!-- Task Details -->
      <div
        v-else-if="taskStore.currentTask"
        class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <!-- Task Image -->

        <div class="h-64 bg-gray-100 relative overflow-hidden">
          <!-- Image Skeleton -->
          <ImageSkeleton v-if="imageLoading && taskStore?.currentTask?.image_url" />
          
          <!-- Actual Image -->
          <img
            v-if="taskStore?.currentTask?.image_url"
            v-show="!imageLoading"
            :src="taskStore?.currentTask?.image_url"
            :alt="taskStore?.currentTask?.title"
            class="w-full h-full object-cover"
            @error="handleImageError"
            @load="handleImageLoad"
          />
          
          <!-- No Image Placeholder -->
          <div
            v-if="!taskStore?.currentTask?.image_url"
            class="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200"
          >
            <div class="text-center">
              <TaskIcon />
              <p class="text-orange-600 text-sm font-medium">No Image</p>
            </div>
          </div>
        </div>

        <div class="p-8">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide',
                  priorityClasses[taskStore.currentTask.priority] ||
                    'bg-gray-100 text-gray-600',
                ]"
              >
                {{ taskStore.currentTask.priority }}
              </span>

              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-semibold',
                  taskStore.currentTask.completed
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700',
                ]"
              >
                {{
                  taskStore.currentTask.completed ? "Completed" : "Incomplete"
                }}
              </span>
            </div>
          </div>

          <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-4">
              {{ taskStore.currentTask.title }}
            </h1>
            <p
              v-if="taskStore.currentTask.description"
              class="text-gray-600 text-lg leading-relaxed"
            >
              {{ taskStore.currentTask.description }}
            </p>
            <p v-else class="text-gray-400 italic">No description provided</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-sm font-semibold text-gray-700 mb-2">Category</h3>
              <div
                v-if="taskCategory"
                class="flex items-center px-3 py-2 rounded-md text-sm font-medium"
                :style="{
                  backgroundColor: taskCategory.color + '15',
                  color: taskCategory.color,
                }"
              >
                <div
                  class="w-3 h-3 rounded-full mr-2"
                  :style="{ backgroundColor: taskCategory.color }"
                ></div>
                {{ taskCategory.name }}
              </div>
              <p v-else class="text-gray-400 text-sm">No category assigned</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-sm font-semibold text-gray-700 mb-2">Due Date</h3>
              <p
                v-if="taskStore.currentTask.due_date"
                class="text-gray-900 text-sm"
              >
                {{ formatDate(taskStore.currentTask.due_date) }}
              </p>
              <p v-else class="text-gray-400 text-sm">No due date set</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-sm font-semibold text-gray-700 mb-2">Created</h3>
              <p class="text-gray-900 text-sm">
                {{ formatDate(taskStore.currentTask.created_at) }}
              </p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-sm font-semibold text-gray-700 mb-2">
                Last Updated
              </h3>
              <p class="text-gray-900 text-sm">
                {{ formatDate(taskStore.currentTask.updated_at) }}
              </p>
            </div>
          </div>

          <div class="flex items-center justify-center gap-6 flex-wrap">
            <button
              @click="toggleCompletion"
              :class="[
                'px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center',
                taskStore.currentTask?.completed
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600',
              ]"
            >
              <CheckIcon
                v-if="!taskStore.currentTask?.completed"
                class="w-4 h-4 mr-2"
              />
              <CloseIcon v-else class="w-4 h-4 mr-2" />
              {{
                taskStore.currentTask?.completed
                  ? "Mark as Incomplete"
                  : "Mark as Complete"
              }}
            </button>
            <button
              @click="editTask"
              class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center"
            >
              <EditIcon class="w-4 h-4 mr-2" />
              Edit Task
            </button>
            <button
              @click="showDeleteConfirm"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center"
            >
              <DeleteIcon class="w-4 h-4 mr-2" />
              Delete Task
            </button>
          </div>
        </div>
      </div>
  </DefaultLayout>

  <!-- Task Modal Form -->
  <TaskModalForm
    :is-open="taskStore.modal.isOpen"
    :is-edit-mode="taskStore.modal.isEditMode"
    :task-data="taskStore.modal.taskData"
  />

  <!-- Confirm Dialog -->
  <ConfirmDialog
    :show="showDeleteDialog"
    title="Delete Task"
    :message="deleteMessage"
    confirm-text="Delete"
    cancel-text="Cancel"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
</template>

<script setup>
  import { onMounted, computed, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useTaskStore } from "@/stores/taskStore";
  import { useCategoryStore } from "@/stores/categoryStore";
  import DefaultLayout from "@/layouts/defaultLayout.vue";
  import LoadingSpinner from "@/components/LoadingSpinner.vue";
  import TaskModalForm from "@/components/TaskModalForm.vue";
  import ConfirmDialog from "@/components/ConfirmDialog.vue";
  import ImageSkeleton from "@/components/ImageSkeleton.vue";
  import BackIcon from "@/assets/icons/BackIcon.vue";
  import CheckIcon from "@/assets/icons/CheckIcon.vue";
  import CloseIcon from "@/assets/icons/CloseIcon.vue";
  import EditIcon from "@/assets/icons/EditIcon.vue";
  import DeleteIcon from "@/assets/icons/DeleteIcon.vue";
  import ErrorIcon from "@/assets/icons/ErrorIcon.vue";
  import TaskIcon from "@/assets/icons/TaskIcon.vue";
  import { useToast } from "vue-toastification";

  const props = defineProps({
    id: {
      type: [String, Number],
      required: false,
    },
  });
  const toast = useToast();

  const route = useRoute();
  const router = useRouter();
  const taskStore = useTaskStore();
  const categoryStore = useCategoryStore();
  const showDeleteDialog = ref(false);
  const imageError = ref(false);
  const imageLoading = ref(true);

  // Get category by ID
  const taskCategory = computed(() => {
    if (!taskStore.currentTask?.category_id) return null;
    return (
      categoryStore.categories.find(
        (cat) => cat.id === taskStore.currentTask.category_id
      ) || null
    );
  });

  const taskId = computed(() => props.id || route.params.id);

  const deleteMessage = computed(() => {
    if (taskStore.currentTask) {
      return `Are you sure you want to delete "${taskStore.currentTask.title}"? This action cannot be undone.`;
    }
    return "Are you sure you want to delete this task? This action cannot be undone.";
  });

  const priorityClasses = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  const loadTask = async () => {
    if (taskId.value) {
      imageLoading.value = true; // Reset loading state for new task
      await taskStore.fetchTask(taskId.value);
    }
  };

  const toggleCompletion = async () => {
    if (taskStore.currentTask) {
      await taskStore.updateTask(taskStore.currentTask.id, {
        completed: !taskStore.currentTask.completed,
      });
      await taskStore.fetchTask(taskStore.currentTask.id);
    }
  };

  const editTask = () => {
    if (taskStore.currentTask) {
      taskStore.openEditModal(taskStore.currentTask);
    } else {
      toast.error("No current task available for editing");
    }
  };


  const showDeleteConfirm = () => {
    showDeleteDialog.value = true;
  };

  const confirmDelete = async () => {
    if (!taskStore.currentTask?.id) return;
    showDeleteDialog.value = false;
    try {
      await taskStore.deleteTask(taskStore.currentTask.id);
      router.push({ name: "TaskList" });
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  const cancelDelete = () => {
    showDeleteDialog.value = false;
  };

  const handleImageError = (event) => {
    console.warn(`Image failed to load for task ${taskStore.currentTask?.id}:`, event.target.src);
    imageError.value = true;
    imageLoading.value = false;
  };

  const handleImageLoad = () => {
    imageError.value = false;
    imageLoading.value = false;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  onMounted(async () => {
    if (categoryStore.categories.length === 0) {
      await categoryStore.fetchCategories();
    }
    loadTask();
  });
</script>

