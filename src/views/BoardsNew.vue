<template>
  <div class="boards-new">
       <div class="wrapper light-wrapper">
      <div class="container inner">
        <div class="row">
          <div class="col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
            <h2 class="section-title mb-40 text-center">Create New Board</h2>
            <form>
              <div class="form-group">
                <label for="exampleInputName1">Title</label>
                <input type="text" v-model="title" class="form-control" id="exampleInputName1" placeholder="Inspiration">
              </div>
              <!-- /.form-group -->
              <div class="form-group">
                <label for="exampleInputEmail1">Description</label>
                <input type="text" v-model="description" class="form-control" id="exampleInputEmail1" placeholder="Coolest stuff ever">
              </div>
              <!-- /.form-group -->
              <button type="button" class="btn" v-on:click="createBoard()">Create</button>
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
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      title: "",
      description: "",
      errors: []
      
    };
  },
  // created: function() {},
  methods: {
    createBoard: function () {
      var params = {
        title: this.title,
        description: this.description
      };
      axios.post("/api/boards", params).then(response => {
        this.$router.push("/boards");
      })
      .catch(error => {
        this.errors = error.response.data.errors;
      });
    }

  }
};
</script>
