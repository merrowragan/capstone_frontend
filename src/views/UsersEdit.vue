<template>
  <div class="users-edit">
    <h1>Edit Account Details</h1>
    <div class="form-group">
      <label>Name:</label>
      <input type="text" class="form-control" v-model="user.name" />
    </div>
    <div class="form-group">
      <div class="form-group">
        <label>Pronouns:</label>
        <input type="text" class="form-control" v-model="user.pronouns" />
      </div>
      <div class="form-group">
        <label>Gender:</label>
        <input type="text" class="form-control" v-model="user.gender" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="text" class="form-control" v-model="user.email" />
      </div>
      <label>Password:</label>
      <input type="text" class="form-control" v-model="user.password" /> <br>
      <button v-on:click="updateUser()">Save Changes</button> <br>
      <button v-on:click="destroyUser()">Delete Account</button> <br>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    updateUser: function() {
      var params = {
        name: this.user.name,
        gender: this.user.gender,
        pronouns: this.user.pronouns,
        email: this.user.email

      };
      axios
        .patch(`/api/users/${this.user.id}`, params)
        .then((response) => {
          this.$router.push(`/users/${this.user.id}`);
        })
        .catch((error) => {
          (this.errors = error.response), data.errors;
        });
    },
    destroyUser: function() {
      if (confirm("Are you sure you want to delete your account?")) {
        axios.delete(`/api/users/${this.user.id}`).then((response) => {
          console.log("User deleted", response.data);
          this.$router.push("/");
        });
      }
    },
  },
};
</script>
