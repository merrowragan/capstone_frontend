<template>
  <div class="users-edit">
    <form v-on:submit.prevent="updateUser()">
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
        <div class="form-group">
          <label>Current Password:</label>
          <input
            type="password"
            class="form-control"
            v-model="currentPassword"
          />
        </div>
        <div class="form-group">
          <label>New Password:</label>
          <input type="password" class="form-control" v-model="newPassword" />
        </div>
        <div class="form-group">
          <label>New Password Confirmation:</label>
          <input
            type="password"
            class="form-control"
            v-model="newPasswordConfirmation"
          />
        </div>
        <br />
        <button v-on:click="updateUser()">Save Changes</button> <br />
        <button v-on:click="destroyUser()">Delete Account</button> <br />
      </div>
    </form>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
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
        email: this.user.email,
        current_password: this.currentPassword,
        new_password: this.newPassword,
        new_password_confirmation: this.newPasswordConfirmation,
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
