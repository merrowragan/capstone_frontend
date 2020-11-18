<template>
  <div class="boards-show">
     
     <div class="wrapper light-wrapper">
      <div class="container inner pt-70">
        <h1 class="heading text-center">{{ board.title }}</h1>
        <h2 class="sub-heading2 text-center">{{ board.description }}</h2>
          <router-link :to="`/boards/${board.id}/edit`">Edit Board</router-link>
      <router-link class="nav-link" to="/images">Explore Images</router-link>
        <div class="space50"></div>
        <div class="tiles grid">
         <div class="items row isotope boxed grid-view text-center" >
            <div v-for="board_image in board.board_images" class="item grid-sizer col-md-6 col-lg-4" >
              <div class="box bg-white shadow p-30">
                <figure class="main polaroid overlay overlay1"><a href="gallery-post.html"><span class="bg"></span><img :src="board_image.image.url" alt=""></a>
                  <figcaption>
                    <h5 class="text-uppercase from-top mb-0">See Gallery</h5>
                  </figcaption>
                </figure>
                 <button v-on:click="removeImageFromBoard(board_image)">Remove</button>
              </div>
               <p>{{ board_image.caption }}</p>
      <div class="form-group">
        <label>Caption:</label>
        <input type="text" class="form-control" v-model="board_image.caption" />
        <button v-on:click="updateBoardImage(board_image)">Save Caption</button>
      </div>
              <!-- /.box -->
            </div>
            <!--/.item -->
           
          </div>
        </div>
        <!--/.tiles -->
      </div>
      <!-- /.container -->
    </div>

    <!-- <h1>{{ board.title }}</h1>
    <p>{{ board.description }}</p> -->
      <!-- <router-link :to="`/boards/${board.id}/edit`">Edit Board</router-link>
      <router-link class="nav-link" to="/images">Explore Images</router-link>

    <div v-for="board_image in board.board_images">
      <img :src="board_image.image.url" alt="" />
      <button v-on:click="removeImageFromBoard(board_image)">Remove</button> -->
      
      <!-- <p>{{ board_image.caption }}</p>
      <div class="form-group">
        <label>Caption:</label>
        <input type="text" class="form-control" v-model="board_image.caption" />
        <button v-on:click="updateBoardImage(board_image)">Save Caption</button>
      </div> -->
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
