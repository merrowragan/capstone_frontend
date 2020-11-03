<template>
  <div class="boards-index">
 
  <div v-for="board in boards">
    <h2>Title: {{ board.title }}</h2>
    <p> Description: {{ board.description }}</p>
    <!-- <p>Created by: {{ board.user_name }}</p> -->
  </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      boards: []
    };
  },
  created: function() {
    this.indexBoards();
  },
  methods: {
    indexBoards: function () {
      axios.get("/api/boards").then((response) => {
        console.log(response.data);
        this.boards = response.data;
      });
    },
  },
};

</script>




