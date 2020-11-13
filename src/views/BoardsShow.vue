<template>
  <div class="boards-show">
    <h1>{{ board.title }}</h1>
    <p>{{ board.description }}</p>
      <router-link :to="`/boards/${board.id}/edit`">Edit Board</router-link>

    <div v-for="board_image in board.board_images">
      <img :src="board_image.image.url" alt="" />
      <button v-on:click="removeImageFromBoard(board_image)">Remove</button>
      
      <p>{{ board_image.caption }}</p>
      <div class="form-group">
        <label>Caption:</label>
        <input type="text" class="form-control" v-model="board_image.caption" />
        <button v-on:click="updateBoardImage(board_image)">Save Caption</button>
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
      board: {},
      board_image: {},
      caption: ""
    };
  },
  created: function() {
    axios.get(`/api/boards/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.board = response.data;
    });
  },
  methods: {
    removeImageFromBoard: function(board_image) {
      if(confirm("Are you sure you want to delete this image?")) {
      axios
        .delete(`/api/board_images/${board_image.image.id}/${this.board.id}`)
        .then((response) => {
          console.log("It is done.");
          var index = this.board.board_images.indexOf(board_image);
          this.board.board_images.splice(index, 1);
        });
      }
    },
    updateBoardImage: function(board_image) {
      this.board_image = board_image
      var params = {
        caption: this.board_image.caption,
      };
      axios
        .patch(`/api/board_images/${this.board_image.id}`, params)
    },
  },
};
</script>
