<template>
    <div class="collapse navbar-collapse justify-content-evenly text-center" :class="{ 'show': isOpen }"
        id="navbarSupportedContent">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        isOpen: Boolean,
    },
};
</script>
