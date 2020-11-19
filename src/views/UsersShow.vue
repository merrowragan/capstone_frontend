<template>
  <div class="users-show">
    <!-- <p v-if="$parent.isLoggedIn()">Profile</p> -->

     <div class="wrapper light-wrapper">
      <div class="container inner">
        <h1 v-if="$parent.isLoggedIn()" class="section-title text-center">Your Profile</h1>

        <div class="col-md-12 text-center">

          <router-link class="btn btn-primary" v-if="user.id === $parent.getUserId()" :to="`/users/${user.id}/edit`">Edit Information</router-link>

        </div>

        <div class="divider-icon"><i class="fa fa-heart"></i></div>
   
        <h5 class="text-left">Name: {{ user.name }}</h5>
        <div class="divider-icon"><i class="fa fa-heart"></i></div>
        <h5 class="text-left">Email: {{ user.email }}</h5>
        <div class="divider-icon"><i class="fa fa-heart"></i></div>
        <h5 class="text-left">Pronouns: {{ user.pronouns }}</h5>
        <div class="divider-icon"><i class="fa fa-heart"></i></div>
        <h5 class="text-left">Gender: {{ user.gender }}</h5>
        <div class="divider-icon"><i class="fa fa-heart"></i></div>
        

      </div>
      <!-- /.container -->
    </div>
<!-- 
    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>
    <p>{{ user.pronouns }}</p>
    <p>{{ user.gender }}</p> -->

    <!-- <router-link v-if="user.id === $parent.getUserId()" :to="`/users/${user.id}/edit`">Edit Information</router-link> -->


  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {}
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.user = response.data
    })
  },
  methods: {},
};
</script>
