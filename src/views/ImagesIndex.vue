<template>
  <div class="images-index">
    <!-- <button v-on:click="sortByCategory()">View by Category</button> -->
    

    <div class="wrapper light-wrapper">
      <div class="container inner pt-70">
        <div class="divider-icon"><i class="fa fa-heart"></i></div>
        <h1 class="heading text-center">Explore Images</h1>
        <h2 class="sub-heading2 text-center">
          Have fun collecting visuals that feel validating, empowering, or interesting to you!
        </h2>
        
          <button
            type="button"
            class="btn btn-teal"
            data-toggle="modal"
            data-target="#newBoardModal"
          >
            Create Board
          </button>
       

        <!-- Board New Modal -->
        <div
          class="modal fade"
          id="newBoardModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="newBoardModalTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="newBoardModalLongTitle">
                  New Board
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="exampleInputName1">Title</label><br />
                    <small v-if="title.length < 1" class="text-danger"
                      >Title required</small
                    >
                    <input
                      type="text"
                      v-model="title"
                      class="form-control"
                      id="exampleInputName1"
                      placeholder="- -"
                    />
                  </div>
                  <!-- /.form-group -->
                  <div class="form-group">
                    <label for="exampleInputEmail1">Description</label>
                    <input
                      type="text"
                      v-model="description"
                      class="form-control"
                      id="exampleInputEmail1"
                      placeholder="- -"
                    />
                  </div>
                  <!-- /.form-group -->
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn"
                  v-if="title.length > 1"
                  v-on:click="createBoard()"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>


        <!-- view by category form -->
        <select v-model="selectedCategory">
          <option disabled value="">View by Category</option>
          <option v-for="category in categories" :value="category.name">{{
            category.name
          }}</option>
        </select>

        <!-- image larger modal -->
        

        <div class="space50"></div>
        <div class="tiles grid">
          <div class="items row isotope boxed grid-view text-center">
            <div
              v-for="image in filterBy(images, selectedCategory, 'categories')"
              class="item grid-sizer col-md-6 col-lg-4"
            >
              <div class="box bg-white shadow p-30">
                <figure class="main polaroid overlay overlay1">
                  <a
                    data-toggle="modal"
                    data-target="#imageShowModal"
                    v-on:click="currentImage = image"
                    ><span class="bg"></span><img :src="image.url" alt=""
                  /></a>

                  

                  <select class="boardSelect" v-model="selectedBoardId">
                    <option disabled value="" >Select Board</option>
                    <option v-for="board in boards" :value="board.id">{{
                      board.title
                    }}</option>
                  </select>
                  <button class="fa fa-plus-circle" aria-hidden="true" style="background:Purple" v-on:click="addImageToBoard(image)">
                    </i>
                  </button>
                  <figcaption>
                    <h5 class="text-uppercase from-top mb-0">View Larger</h5>
                  </figcaption>
                </figure>
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
    <!-- Image show Modal -->
    <div
      class="modal fade"
      id="imageShowModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="imageShowModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img
              id="modalImage"
              class="img-responsive"
              :src="currentImage.url"
              alt=""
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-teal"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- /image show modal -->

    {{ message }}
    <!-- <select v-model="selectedCategory">
      <option disabled value="">Select Category</option>
      <option v-for="category in categories" :value="category.name">{{
        category.name
      }}</option>
    </select>
    <button v-on:click="sortByCategory()">View by Category</button>

    hash from sortByCategory
    {{ categoryImageHash.images }}
    <!-- the v-model associated with the menu -->
    <!-- {{ selectedCategory }} -->

    <!-- <div v-for="image in filterBy(images, selectedCategory, 'categories')">
      <img :src="image.url" alt="" />
      <select v-model="selectedBoardId">
        <option disabled value="">Select Board</option>
        <option v-for="board in boards" :value="board.id">{{
          board.title
        }}</option>
      </select>
      <button v-on:click="addImageToBoard(image)">Add to Board</button>
    </div>  -->
  </div>
</template>
<script src="https://use.fontawesome.com/66b43d76c1.js"></script>

<style>
#modalImage {
  width: 100%;
}
select.boardSelect {
  background-color: lightskyblue;
}
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

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
      title: "",
      description: "",
      categoryImageHash: [],
      errors: [],
      image: {},
      currentImage: {},
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
        .then(confirm("Image added to board"));
    },
    indexCategories: function() {
      axios.get("/api/categories").then((response) => {
        console.log(response.data);
        this.categories = response.data;
      });
    },

    createBoard: function() {
      var params = {
        title: this.title,
        description: this.description,
      };
      axios
        .post("/api/boards", params)
        .then((response) => {
          $("#newBoardModal").modal("hide");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
