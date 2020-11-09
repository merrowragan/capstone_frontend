<template>
  <div class="boards-show">
    <h1>{{ board.title }}</h1>
    <p>{{ board.description }}</p>

    <div v-for="image in board.images">
      <img :src="image.url" alt="">
      <button v-on:click="removeImageFromBoard(image)">Remove</button>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      board: {}
    };
  },
  created: function() {
    axios.get(`/api/boards/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.board = response.data
    })
  },
  methods: {
    removeImageFromBoard: function(image) {
      axios.delete(`/api/board_images/${image.id}/${this.board.id}`).then( response => {
        console.log("It is done.");
        var index = this.board.images.indexOf(image);
        this.board.images.splice(index, 1);
      });
    }
  },
};
</script>
