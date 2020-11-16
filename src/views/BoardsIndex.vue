<template>
  <div class="boards-index">

    <div v-if="boards.length == 0">
      <h1>You have no boards yet</h1>
      <router-link to="/boards/new">Create a board!</router-link>

    </div>
    <div v-else v-for="board in boards">
   
      
        <h2>
          <router-link :to="`/boards/${board.id}`">{{
            board.title
          }}</router-link>
        </h2>
        <p>{{ board.description }}</p>
        <div v-if="board.images[0] == null">
          <img
            src="https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=2515&q=80"
            alt=""
          /><br>
          <router-link to="/images">Explore Images</router-link>
        </div>
        <div v-else>
          <img :src="board.images[0].url" alt="" />
        </div>
      
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      boards: [],
      images: [],
    };
  },
  created: function() {
    this.indexBoards();
  },
  methods: {
    indexBoards: function() {
      axios.get("/api/boards").then((response) => {
        console.log(response.data);
        this.boards = response.data;
      });
    },
  },
};
</script>
