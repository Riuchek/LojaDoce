<script setup lang="ts">

const login = ref<string>('')
const password = ref<string>('')

const handleLogin = () => {
  if (login.value === 'admin' && password.value === 'admin123') {
    navigateTo('/relatorios')
  }
}
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
            <h1 class="text-3xl font-bold text-center text-gray-900">Delicias de Minas</h1>
            <div class="space-y-4">
                <input 
                    type="text" 
                    v-model="login"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Username"
                />
                <input 
                    type="password" 
                    v-model="password"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                />
                <button 
                    @click="handleLogin"
                    class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                    Login
                </button>
            </div>
        </div>
    </div>
</template>
