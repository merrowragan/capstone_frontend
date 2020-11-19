<template>
  <div class="users-edit">
    <div class="wrapper light-wrapper">
      <div class="container inner">
        <div class="row">
          <div class="col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
             <div class="divider-icon"><i class="fa fa-heart"></i></div>
            <h2 class="section-title mb-40 text-center">Edit Profile</h2>
      <form v-on:submit.prevent="updateUser()">
      <div class="form-group">
        <label for="exampleInputName1">Name</label><br>
        <small v-if="user.name.length < 1" class="text-danger">Name cannot be empty</small>
        <input type="text" v-model="user.name" class="form-control" id="exampleInputName1" placeholder="- -">
      </div>
      <!-- /.form-group -->

      <div class="form-group">
        <label for="exampleInputPronouns1">Pronouns:</label><br>
        <small v-if="user.pronouns.length < 1" class="text-danger">Field required ("I'm not sure" is fine!)</small>
        <input type="text" v-model="user.pronouns" class="form-control" id="exampleInputPronouns1" placeholder="- -">
      </div>
      <!-- /.form-group -->
      <div class="form-group">
        <label for="exampleInputGender1">Gender:</label><br>
        <small v-if="user.gender.length < 1" class="text-danger">Field required ("I'm not sure" is fine!)</small>
        <input type="text" v-model="user.gender" class="form-control" id="exampleInputGender1" placeholder="- -">
      </div>
      <!-- /.form-group -->
      <div class="form-group">
        <label for="exampleInputEmail1">Email:</label><br>
        <small v-if="user.email.length < 1" class="text-danger">Field required</small>
        <input type="text" v-model="user.email" class="form-control" id="exampleInputEmail1" placeholder="- -">
      </div>
       
      <div class="form-group">
        <label for="exampleInputCurrentPassword1">Current Password:</label><br>
          <small v-if="currentPassword.length < 7" class="text-danger">Must be at least 7 characters</small>
        <input type="text" v-model="currentPassword" class="form-control" id="exampleInputCurrentPassword1" placeholder="- -">
      </div>
      <!-- /.form-group -->
      <div class="form-group">
        <label for="exampleInputNewPassword1">New Password:</label><br>
        <small v-if="newPassword.length < 7" class="text-danger">Must be at least 7 characters</small>
        <input type="text" v-model="newPassword" class="form-control" id="exampleInputNewPassword1" placeholder="- -">
      </div>
      <!-- /.form-group -->
      <div class="form-group">
        <label for="exampleInputEmail1">New Password Confirmation:</label><br>
        <small v-if="newPassword !== newPasswordConfirmation" class="text-danger">Must match new password</small>
        <input type="text" v-model="newPasswordConfirmation" class="form-control" id="exampleInputNewPasswordConfirmation1" placeholder="- -">
      </div>
      <!-- conditionals corresponding to the warning messages above -->
       <button v-if="user.name.length > 1 && user.pronouns.length > 1 && user.email.length > 1 && user.gender.length > 1 && newPassword == newPasswordConfirmation" v-on:click="updateUser()" type="button" class="btn">Save Changes</button> <br />
       <button v-on:click="destroyUser()" type="button" class="btn">Delete Account</button> <br />
     
      
      <!-- /.form-group -->
    
    </form>
      </div>
      </div>
    </div>
  </div>

      <!-- <h1>Edit Account Details</h1>
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
          <label>New Password Confirmation:</label><br>
          <small v-if="newPassword !== newPasswordConfirmation" class="text-danger">Must match password</small>
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
    </form> -->
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
           delete axios.defaults.headers.common["Authorization"];
           localStorage.removeItem("jwt");
           localStorage.removeItem("user_id");
           this.$router.push("/");
        });
      }
    },
  },
};
</script>
