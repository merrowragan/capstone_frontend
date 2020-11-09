<template>
  <div class="images-index">
    {{ message }}
    <div v-for="image in images">
      <img :src="image.url" alt="">
      <select v-model="selectedBoardId">
        <option disabled value="">Select Board</option>
        <option v-for="board in boards" :value="board.id">{{ board.title }}</option>
      </select>
      <button v-on:click="addImageToBoard(image)">Add to Board</button>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      images: [],
      boards: [],
      selectedBoardId: "",
      message: ""
    };
  },
  created: function() {
    this.indexImages();
    this.indexBoards();
  },
  methods: {
    indexImages: function() {
      axios.get("/api/images").then((response) => {
        console.log(response.data);
        this.images = response.data;
      });
    },
    indexBoards: function() {
      axios.get("/api/boards").then((response) => {
        console.log(response.data);
        this.boards = response.data;
      });
    },
    addImageToBoard: function(image) {
      var params = {
        board_id: this.selectedBoardId,
        image_id: image.id
      }
      axios.post("/api/board_images", params).then(
        this.message = "Yay you did it!"
      );
    }
  },
};
</script>
