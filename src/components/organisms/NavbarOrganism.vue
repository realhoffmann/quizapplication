<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <Logo />
            <ToggleButton @click="toggleNavbar" />
            <NavbarToggleMenu :isOpen="isNavbarOpen">
                <router-link to="/">Home</router-link><br>
                <router-link to="/login">Login</router-link><br>
                <router-link to="/about">About</router-link>
            </NavbarToggleMenu>
        </div>
    </nav>
</template>

<script>
import Logo from '../atoms/LogoAtom.vue';
import ToggleButton from '../atoms/ToggleButtonAtom.vue';
import NavbarToggleMenu from '../molecules/NavbarToggleMenuMolecule.vue';

export default {
    data() {
        return {
            isNavbarOpen: false,
        };
    },
    methods: {
        toggleNavbar() {
            this.isNavbarOpen = !this.isNavbarOpen;
        },
    },
    components: {
        Logo,
        ToggleButton,
        NavbarToggleMenu,
    },
};
</script>
