<template>
  <div class="users-show">
    <p v-if="$parent.isLoggedIn()">Profile</p>

    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>
    <p>{{ user.pronouns }}</p>
    <p>{{ user.gender }}</p>

    <router-link v-if="user.id === $parent.getUserId()" :to="`/users/${user.id}/edit`">Edit Information</router-link>


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
