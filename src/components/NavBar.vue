<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <router-link to="/">
                <a class="navbar-brand" href="#"><img src="../assets/logo.png" width="60" height="60">
                </a></router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-evenly text-center" id="navbarSupportedContent">
                <router-link to="/">Home</router-link>
                <router-link to="/login">Login</router-link>
                <router-link to="/about">About</router-link>

            </div>
        </div>
    </nav>
</template>