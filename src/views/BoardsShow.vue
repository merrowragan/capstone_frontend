<template>
  <div class="boards-show">
    <h1>{{ board.title }}</h1>
    <p>{{ board.description }}</p>
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
  methods: {},
};
</script>
