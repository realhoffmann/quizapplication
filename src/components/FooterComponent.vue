
<template>
  <footer>
    <nav aria-label="Footer navigation">
      <ul>
        <li><router-link to="/imprint">Imprint</router-link></li>
        <li><router-link to="/privacy">Privacy</router-link></li>
        <li><router-link to="/faq">FAQ</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </nav>
    <div>
      <p>Copyright &copy; QuizApp GmbH</p>
    </div>
    <div>
      <router-link to="/">
        <img src="../assets/logo.png" width="60" height="60" alt="QuizApp Logo">
      </router-link>
    </div>
  </footer>
</template>
