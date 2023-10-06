<template>
    <footer>
        <ul>
            <li> <router-link to="/">Imprint</router-link> </li>
            <li> <router-link to="/">Privacy</router-link> </li>
            <li> <router-link to="/">FAQ</router-link> </li>
            <li> <router-link to="/">Contact</router-link> </li>
            <p></p>
            <p>Copyright &copy; QuizApp GmbH</p>
            <Logo />
        </ul>
    </footer>
</template>

<script>
import Logo from '../atoms/LogoAtom.vue';

export default {
    components: {
        Logo,
    },
};
</script>
