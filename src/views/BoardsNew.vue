<template>
  <div class="boards-new">
    <div>
    <h1>New Board</h1>
    Title: <input type="text" v-model="title"><br>
    Description: <input type="text" v-model="description"><br>
    <button v-on:click="createBoard()">Create</button>
    </div>

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
