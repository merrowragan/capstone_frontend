<template>
  <div class="boards-show">
     <div class="wrapper light-wrapper">
      <div class="container inner pt-70">
        <div class="divider-icon"><i class="fa fa-heart"></i></div>
        <h1 class="heading text-center">{{ board.title }}</h1>
        <h2 class="sub-heading2 text-center">{{ board.description }}</h2>
        <div class="col-md-12 text-center">
           <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Edit Board
    </button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Board</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Title:</label>
              <input type="text" class="form-control" v-model="board.title">
              <small v-if="board.title.length < 1" class="text-danger">Title cannot be empty</small>
            </div>
            <div class="form-group">
              <label>Description:</label>
              <input type="text" class="form-control" v-model="board.description">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" v-if="board.title.length > 1" v-on:click="updateBoard()">Save Changes</button>
            <button type="button" class="btn" v-on:click="destroyBoard()">Delete Board</button>
          </div>
        </div>
      </div>
    </div>
        <div class="space50"></div>
        <div class="tiles grid">
         <div class="items row isotope boxed grid-view text-center" >
            <div v-for="board_image in board.board_images" class="item grid-sizer col-md-6 col-lg-4" >
              <div class="box bg-white shadow p-30">
                <figure class="main polaroid overlay overlay1"><a ><img :src="board_image.image.url" alt=""></a>
               
                </figure>
                <p>{{ board_image.caption }}</p>

                  <!-- Board image edit Button trigger modal -->
                  <button type="button" v-on:click="currentBoardImage = board_image" class="btn btn-blue" data-toggle="modal" data-target="#exampleModalCenter">
                    <i class="fa fa-pencil fa-lg" aria-hidden="true"></i>
                  </button>

                  
              </div>
               <!-- <p>{{ board_image.caption }}</p> -->
            <!-- <div class="form-group">
              <label>Caption:</label>
              <input type="text" class="form-control" v-model="board_image.caption" />
              <button v-on:click="updateBoardImage(board_image)">Save Caption</button>
            </div> -->
              <!-- /.box -->
            </div>
            <!--/.item -->
           
          </div>
        </div>
        <!--/.tiles -->
      </div>
      <!-- /.container -->
    </div>
    <!-- Board image edit Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Edit Image</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            
            <div class="form-group">
              <label for="caption">Caption</label>
              <input type="text" class="form-control" id="caption" v-model="currentBoardImage.caption">
            </div>
            <!-- /.form-group -->
              
            <button v-on:click="updateBoardImage(currentBoardImage)" class="btn">Save</button>
            
            <button class="btn btn-primary float-right" v-on:click="removeImageFromBoard(currentBoardImage)">Remove Image</button>
            
          </div>
          
        </div>
      </div>
    </div>
    <!-- /Board image edit Modal -->

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

<script src="https://use.fontawesome.com/66b43d76c1.js"></script>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      board: {},
      board_image: {},
      caption: "",
      currentBoardImage: {}
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
          $("#exampleModalCenter").modal("hide");
        });
      }
    },
    updateBoardImage: function(board_image) {
      this.board_image = board_image
      var params = {
        caption: this.board_image.caption,
      };
      axios
        .patch(`/api/board_images/${this.board_image.id}`, params);
        $("#exampleModalCenter").modal("hide");
    },
    updateBoard: function() {
      var params = {
        title: this.board.title,
        description: this.board.description,
      };
      axios.patch(`/api/boards/${this.board.id}`, params).then((response) => {
        $("#exampleModal").modal("hide");
      })
      .catch(error => {
        this.errors = error.response,data.errors;
      });
    },
    destroyBoard: function () {
      if(confirm("Are you sure you want to delete this board?")) {
        axios.delete(`/api/boards/${this.board.id}`).then(response => {
          console.log("Board deleted", response.data);
          $("#exampleModal").modal("hide");
          this.$router.push("/boards");
        })
      }
    }
  },
};
</script>
