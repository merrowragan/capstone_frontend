<template>
  <div class="login">
    <div class="wrapper light-wrapper">
      <div class="container inner">
        <div class="row">
          <div class="col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
            <h2 class="section-title mb-40 text-center">Login</h2>
             <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
            <form v-on:submit.prevent="submit()">
              <div class="form-group">
                <label for="exampleInputEmail">Email:</label>
                <input type="text" v-model="email" class="form-control" id="exampleInputEmail" placeholder="- -">
              </div>
              <!-- /.form-group -->
              <div class="form-group">
                <label for="exampleInputPassword">Password</label>
                <input type="text" v-model="password" class="form-control" id="exampleInputPassword" placeholder="- -">
              </div>
              <!-- /.form-group -->
             <input type="submit" class="btn btn-primary" value="Submit">
            </form>
            <!-- /form -->
          </div>
          <!-- /column -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container -->
    </div>




    <!-- <form v-on:submit.prevent="submit()">
      <h1>Login</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="email">
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="password">
      </div>
      <input type="submit" class="btn btn-primary" value="Submit">
    </form> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>