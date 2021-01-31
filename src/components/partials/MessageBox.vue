<template>
    <div id="message-box" :class="type">
        <div><strong>{{ message }}</strong></div>

        <div class="error-messages" v-if="errors">
            <div v-for="(error, key) in errors" :key="key">{{ error[0] }}</div>
        </div>

        <button class="message-box-close" @click="closeBox">close</button>
    </div>
</template>

<script>
export default {
    name: 'MessageBox',
    props: {
        type: {
            required: true
        },
        message: {
            required: true
        },
        errors: {
            requred: false
        }
    },
    methods: {
        closeBox() {
            this.$emit('close')   
        }
    }
}
</script>

<style scoped>
    #message-box {
        padding: 20px;
        width: 800px;
        margin: 0 auto 30px;
        color: #fff;
        position: relative;
    }
    #message-box.success {
        background-color: #4BB543;
    }
    #message-box.error {
        background-color: #FF3333;
    }
    .error-messages {
        margin-top: 20px;
    }
    .message-box-close {
        margin-top: 20px;
    }
</style>