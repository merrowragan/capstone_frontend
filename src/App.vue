<template>
  <div id="app">
    <div class="wrapper light-wrapper">
    <nav class="navbar center navbar-expand-lg">
     
      <div class="container flex-lg-column" >
        <div class="navbar-header">
          <div class="navbar-brand">
            
            <a href="index.html"
              ><img id="logoImage"
              class="img-fluid" alt="Responsive image"
                src="/style/images/logo-edit.jpg"
               style="max-width: 100%; height: auto;"  
            /></a>
          </div>
          <div class="navbar-hamburger ml-auto d-lg-none d-xl-none">
            <button
              class="hamburger animate"
              data-toggle="collapse"
              data-target=".navbar-collapse"
            >
              <span></span>
            </button>
          
          </div>
        </div>
        <!-- /.navbar-header -->
        <div class="navbar-collapse collapse w-100 bg-light">
          <ul
            class="navbar-nav nav-fill w-100"
            data-smartmenus-id="16055596499355562"
          >
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li v-if="!isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/signup">Signup</router-link>
            </li>
            <li v-if="!isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li v-if="isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/logout">Logout</router-link>
            </li>
            <li v-if="isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/boards">Your Boards</router-link>
            </li>
            <li v-if="isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/boards/new">Create New Board</router-link>
            </li>
            <li v-if="isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/images">Explore Images</router-link>
            </li>
            <li v-if="isLoggedIn()" class="nav-item">
              <router-link class="nav-link" :to="`/users/${getUserId()}`">Your Profile</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
    <router-view />
   
  </div>
</template>

<style>

</style>

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
