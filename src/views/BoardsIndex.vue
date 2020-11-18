<template>
  <div class="boards-index">
    <div class="wrapper light-wrapper">
      <div class="container inner pt-70">
        <h1 class="heading text-center">Your Boards!</h1>
        <h2 class="sub-heading2 text-center">Wow</h2>
        <div class="space50"></div>
        <div class="tiles grid">
          <div v-if="boards.length == 0">
            <h1>You have no boards yet</h1>
            <router-link to="/boards/new">Create a board!</router-link>
          </div>
          <div v-else class="items row isotope boxed grid-view text-center"
          >
            <div  v-for="board in boards" class="item grid-sizer col-md-6 col-lg-4">
              <div class="box bg-white shadow p-30">
                <figure class="main mb-20 overlay overlay1 rounded">
                  <!-- <div v-if="board.images[0] == null">
                    <img
                      src="https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=2515&q=80"
                      alt=""
                    /><br />
                    <router-link to="/images">Explore Images</router-link>
                  </div> -->
                  <a href="gallery-post.html"
                    >
                    <img v-if="board.images[0]" :src="board.images[0].url" alt=""
                  />
                    <img v-else src="https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=2515&q=80" alt=""
                  />
                  </a>
                  <figcaption>
                    <h5 class="text-uppercase from-top mb-0">See Gallery</h5>
                  </figcaption>
                </figure>
                <h4>
                  <router-link class="mb-0" :to="`/boards/${board.id}`">{{
                    board.title
                  }}</router-link>
                </h4>
                <p>{{ board.description }}</p>
              </div>
              <!-- /.box -->
            </div>
            <!--/.item -->
          </div>
          <!--/.row -->
        </div>
        <!--/.tiles -->
      </div>
      <!-- /.container -->
    </div>

    <!-- <div v-if="boards.length == 0">
      <h1>You have no boards yet</h1>
      <router-link to="/boards/new">Create a board!</router-link>
    </div>
    <div v-else v-for="board in boards">
      <h2>
        <router-link :to="`/boards/${board.id}`">{{ board.title }}</router-link>
      </h2>
      <p>{{ board.description }}</p>
      <div v-if="board.images[0] == null">
        <img
          src="https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=2515&q=80"
          alt=""
        /><br />
        <router-link to="/images">Explore Images</router-link>
      </div>
      <div v-else>
        <img :src="board.images[0].url" alt="" />
      </div>
    </div> -->
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
