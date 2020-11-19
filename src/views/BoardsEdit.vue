<template>
  <div class="boards-edit">
    <h1>Edit Board</h1>
    <div class="form-group">
      <label>Title:</label>
      <input type="text" class="form-control" v-model="board.title">
    </div>
    <div class="form-group">
      <label>Description:</label>
      <input type="text" class="form-control" v-model="board.description">
    </div>
      <button v-on:click="updateBoard()">Save Changes</button>
      <button v-on:click="destroyBoard()">Delete Board</button>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      board: {},
      caption: {},
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/boards/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.board = response.data;
    });
  },
  methods: {
    updateBoard: function() {
      var params = {
        title: this.board.title,
        description: this.board.description,
      };
      axios.patch(`/api/boards/${this.board.id}`, params).then((response) => {
        this.$router.push(`/boards/${this.board.id}`);
      })
      .catch(error => {
        this.errors = error.response,data.errors;
      });
    },
    destroyBoard: function () {
      if(confirm("Are you sure you want to delete this board?")) {
        axios.delete(`/api/boards/${this.board.id}`).then(response => {
          console.log("Board deleted", response.data);
          this.$router.push("/boards");
        })
      }
    }
  },
};
</script>
