<template>
    <div class="container d-flex justify-content-center align-items-center">
        <div class="card login-card">
            <div class="card-body">
                <h2 class="card-title text-center">Login</h2>
                <form>
                    <div class="form-group">
                        <label for="username">User Name/E-Mail</label>
                        <input type="text" class="form-control" id="username" placeholder="Max/max.muster@gmail.com">
                    </div>
                    <div class="form-group">
                        <label for="password">Passwort</label>
                        <input type="password" class="form-control" id="password" placeholder="********" minlength="8">
                    </div>
                    <div class="button-container justify-content-evenly">
                        <button type="submit" class="btn btn-primary card-button">Login</button>
                        <!--Button should not reload, implement later-->
                        <button type="button" class="btn btn-primary card-button"
                            onclick="location.href='register'">Registrieren</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>