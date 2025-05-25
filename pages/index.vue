<script setup lang="ts">


const { isMobile } = useDevice()

const login = ref<string>('')
const password = ref<string>('')

const handleLogin = () => {
    console.log(login.value, password.value)
}
</script>

<template>
    <div v-if="isMobile" class="mobile">
        <h1>Login</h1>
        <input type="text" v-model="login" />
        <input type="password" v-model="password" />
        <button @click="handleLogin">Login</button>
    </div>
    <div v-else class="desktop">
        <h1>Login</h1>
        <input type="text" v-model="login" />
        <input type="password" v-model="password" />
        <button @click="handleLogin">Login</button>
    </div>
</template>

<style lang="scss" scoped>
.mobile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.desktop {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
</style>