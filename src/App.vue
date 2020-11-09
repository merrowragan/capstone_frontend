<template>
  <div id="app">
    <div id="nav">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li v-if="!isLoggedIn()">
        <router-link to="/signup">Signup</router-link>
      </li>
      <li v-if="!isLoggedIn()">
        <router-link to="/login">Login</router-link>
      </li>
      <li v-if="isLoggedIn()">
        <router-link to="/logout">Logout</router-link>
      </li>
      <li>
        <router-link to="/boards">Your Boards</router-link>
      </li>
      <li>
        <router-link to="/boards/new">Create New Board</router-link>
      </li>
      <li>
        <router-link to="/images">Explore Images</router-link>
      </li>

      <router-link v-if="isLoggedIn()" :to="`/users/${getUserId()}`">Your Profile</router-link>
      
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      flashMessage: "",
    };
  },
  methods: {
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    },
    getUserId: function() {
      return parseInt(localStorage.getItem("user_id"));
    },
  },
};
</script>

<style>
img {
  width: 250px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
</style>
