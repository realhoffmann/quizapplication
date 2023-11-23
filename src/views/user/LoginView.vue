<template>
    <div class="auth-container">
        <div class="auth-card">
            <h1 class="auth-title">Login</h1>
            <form class="auth-form">
                <div class="form-group">
                    <label class="form-label" for="username">User Name/E-Mail</label>
                    <input type="text" class="form-control" id="username" placeholder="Enter your username or email">
                </div>
                <div class="form-group">
                    <label class="form-label" for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Enter your password"
                        minlength="8">
                </div>
                <div class="form-actions">

                    <button type="submit" class="btn btn-primary card-button">Login</button>
                    <router-link to="/register" class="btn btn-primary card-button">Register</router-link>
                </div>
                <hr>

            </form>
        </div>
    </div>
</template>