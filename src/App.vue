<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
// import '@/assets/styles/app.css'
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

button {
  background-color: #eaeaea;
  padding: 12px 18px;
  border: none;
  transition: opacity 0.6s ease 0;
  cursor: pointer;
  opacity: 1;
  outline: none;
}

button:hover {
  opacity: 0.6;
}
</style>
