<template>
    <button :class="buttonClass" @click="handleClick">{{ label }}</button>
</template>

<script>
export default {
    props: {
        label: String,
        buttonClass: String,
    },
    methods: {
        handleClick() {
            this.$emit('click');
        },
    },
};
</script>
