<template>
    <input type="checkbox" :id="id" :name="name" :value="value">
</template>

<script>
export default {
    props: {
        id: String,
        name: String,
        value: String,
    },
};
</script>
