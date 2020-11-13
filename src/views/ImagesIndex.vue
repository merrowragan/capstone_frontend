<template>
  <div class="images-index">
    {{ message }}
    <select v-model="selectedCategory">
      <option disabled value="">Select Category</option>
      <option v-for="category in categories" :value="category.name">{{
        category.name
      }}</option>
    </select>
    <button v-on:click="sortByCategory()">View by Category</button>

   <!-- hash from sortByCategory -->
    {{ categoryImageHash.images}}
<!-- the v-model associated with the menu -->
    {{selectedCategory}}
    

    <div v-for="image in filterBy(images, selectedCategory, 'categories')">
      <img :src="image.url" alt="" />
      <select v-model="selectedBoardId">
        <option disabled value="">Select Board</option>
        <option v-for="board in boards" :value="board.id">{{
          board.title
        }}</option>
      </select>
      <button v-on:click="addImageToBoard(image)">Add to Board</button>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from 'vue2-filters'

export default {
  mixins: [Vue2Filters.mixin],

  data: function() {
    return {
      categories: [],
      images: [],
      boards: [],
      selectedBoardId: "",
      selectedCategory: "",
      message: "",
      categoryImageHash: []
    
    };
  },
  created: function() {
    this.indexImages();
    this.indexBoards();
    this.indexCategories();
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
        image_id: image.id,
      };
      axios
        .post("/api/board_images", params)
        .then((this.message = "Yay you did it!"));
    },
    indexCategories: function() {
      axios.get("/api/categories").then((response) => {
        console.log(response.data);
        this.categories = response.data;
      });
    },
    sortByCategory: function() {
      axios.get(`/api/categories/${this.selectedCategory}`).then((response) => {
        console.log(response.data);
        this.categoryImageHash = response.data; 

      })
    
    }
  },
};
</script>
