<template>
  <div class="users-show">
    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>
    <p>{{ user.pronouns }}</p>
    <p>{{ user.gender }}</p>
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
