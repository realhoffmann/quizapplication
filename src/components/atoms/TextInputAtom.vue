<template>
    <input type="text" :id="id" :name="name" :placeholder="placeholder">
</template>

<script>
export default {
    props: {
        id: String,
        name: String,
        placeholder: String,
    },
};
</script>
