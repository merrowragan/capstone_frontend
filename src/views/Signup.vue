<template>
  <div class="signup">
    <div class="wrapper light-wrapper">
      <div class="container inner">
        <div class="row">
          <div class="col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
            <h2 class="section-title mb-40 text-center">Signup</h2>
            <h4 class="section-title mb-40 text-center">All profile information can be changed anytime!</h4>
            <form v-on:submit.prevent="submit()">
              <div class="form-group">
                <label for="exampleInputName1">Name</label><br>
                <small v-if="name.length < 1" class="text-danger">Name cannot be empty</small>
                <input type="text" v-model="name" class="form-control" id="exampleInputName1" placeholder="- -">
              </div>
              <!-- /.form-group -->
              <div class="form-group">
                <label for="exampleInputEmail1">Email:</label><br>
                 <small v-if="email.length < 1" class="text-danger">Field required </small>
                <input type="text" v-model="email" class="form-control" id="exampleInputEmail1" placeholder="- -">
              </div>
              <!-- /.form-group -->
              <div class="form-group">
                <label for="exampleInputEmail1">Pronouns:</label><br>
                 <small v-if="pronouns.length < 1" class="text-danger">Field required ("I'm not sure" is fine!)</small>
                <input type="text" v-model="pronouns" class="form-control" id="exampleInputPronouns1" placeholder="- -">
              </div>
              <!-- /.form-group -->
              <div class="form-group">
                <label for="exampleInputEmail1">Gender:</label><br>
                <small v-if="gender.length < 1" class="text-danger">Field required ("I'm not sure" is fine!)</small>
                <input type="text" v-model="gender" class="form-control" id="exampleInputGender1" placeholder="- -">
              </div>
              <!-- /.form-group -->
              <div class="form-group">
                <label for="exampleInputEmail1">Password:</label><br>
                <small v-if="password.length < 7" class="text-danger">Must be at least 7 characters</small>
                <input type="text" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="- -">
              </div>
              <!-- /.form-group -->
              <div class="form-group">
                <label for="exampleInputEmail1">Password Confirmation:</label><br>
                <small v-if="password !== passwordConfirmation" class="text-danger">Must match password</small>
                <input type="text" v-model="passwordConfirmation" class="form-control" id="exampleInputPasswordConfirmation1" placeholder="- -">
              </div>
              <!-- conditionals corresponding to the warning messages above -->
              <input v-if="name.length > 1 && pronouns.length > 1 && gender.length > 1 && password == passwordConfirmation && password.length > 6 && email.length > 1" type="submit" class="btn btn-primary" value="Submit">
              
              <!-- /.form-group -->
            
            </form>
            <!-- /form -->
          </div>
          <!-- /column -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container -->
    </div>
    <!-- <div>
    <h1>New Board</h1>
    Title: <input type="text" v-model="title"><br>
    Description: <input type="text" v-model="description"><br>
    <button v-on:click="createBoard()">Create</button>
    </div> -->

  </div>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      email: "",
      pronouns: "",
      gender: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        pronouns: this.pronouns,
        gender: this.gender,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>