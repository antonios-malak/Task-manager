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
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-6 py-8">
      <slot />
    </main>
  </div>
</template>

