<template>
  <div class="boards-index">
    <div v-for="board in boards">
      <h2>
        <router-link :to="`/boards/${board.id}`">{{ board.title }}</router-link>
      </h2>
      <p>{{ board.description }}</p>
      <div>
        <img :src="board.images[0].url" alt=""/> 
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
      images: []
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
