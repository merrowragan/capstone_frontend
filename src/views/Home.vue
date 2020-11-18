<template>
  <div class="home">
   
    <div class="wrapper light-wrapper">
      <div class="container inner pt-70">
         <h3 v-if="$parent.isLoggedIn()" class="sub-heading2 text-center">{{generateSentence()}}</h3>
          <h3 v-if="$parent.isLoggedIn()" class="sub-heading2 text-center">Your pronouns are: {{user.pronouns}}</h3>
        <h1 class="heading text-center">Welcome to Butterfly Park!</h1>
       
           <h4 v-if="$parent.isLoggedIn()" class="text-center">This is your space to explore who you are, who you are becoming, and who you want to be.</h4>
        <div class="space50"></div>
        <div class="tiles grid">

   

     <div class="items row isotope boxed grid-view text-center">
            
            <!--/.item -->
            <div class="item grid-sizer col-md-6 col-lg-4">
              <div class="box bg-white shadow p-30">
                <figure class="main mb-20 overlay overlay1 rounded"> <router-link class="nav-link" to="/images"><img src="style/images/hands.jpg" alt="" /></router-link>
                  <figcaption>
                    <h5 class="text-uppercase from-top mb-0"></h5>
                  </figcaption>

                </figure>
                <h4 class="mb-0">Get Inspired!</h4>
              </div>
              <!-- /.box -->
            </div>
            <!--/.item -->
            <div class="item grid-sizer col-md-6 col-lg-4">
              <div class="box bg-white shadow p-30">
                <figure class="main mb-20 overlay overlay1 rounded"><a href="gallery-post.html"><img src="style/images/art/g3-5.jpg" alt="" /></a>
                  <figcaption>
                    <h5 class="text-uppercase from-top mb-0"></h5>
                  </figcaption>
                </figure>
                <h4 class="mb-0">About Butterfly Park</h4>
              </div>
              <!-- /.box -->
            </div>
            <!--/.item -->
            <div class="item grid-sizer col-md-6 col-lg-4">
              <div class="box bg-white shadow p-30">
                <figure class="main mb-20 overlay overlay1 rounded"><a href="gallery-post2.html"><img src="style/images/sun.jpg" alt="" /></a>
                  <figcaption>
                    <h5 class="text-uppercase from-top mb-0">See Gallery</h5>
                  </figcaption>
                </figure>
                <h4 class="mb-0">LGBTQ+ History</h4>
              </div>
              <!-- /.box -->
            </div>
            <!--/.item -->
            <div class="item grid-sizer col-md-6 col-lg-4">
              <div class="box bg-white shadow p-30">
                <figure class="main mb-20 overlay overlay1 rounded"><a href="gallery-post3.html"><img src="style/images/sun.jpg" alt="" /></a>
                  <figcaption>
                    <h5 class="text-uppercase from-top mb-0">See Gallery</h5>
                  </figcaption>
                </figure>
                <h4 class="mb-0">LGBTQ+ Media</h4>
              </div>
              <!-- /.box -->
            </div>
            <!--/.item -->
            <div class="item grid-sizer col-md-6 col-lg-4">
              <div class="box bg-white shadow p-30">
                <figure class="main mb-20 overlay overlay1 rounded"><a href="gallery-post4.html"><img src="style/images/art/g3-8.jpg" alt="" /></a>
                  <figcaption>
                    <h5 class="text-uppercase from-top mb-0">See Gallery</h5>
                  </figcaption>
                </figure>
                <h4 class="mb-0">LGBTQ+ Role Models</h4>
              </div>
              <!-- /.box -->
            </div>
            <!--/.item -->
            <div class="item grid-sizer col-md-6 col-lg-4">
              <div class="box bg-white shadow p-30">
                <figure class="main mb-20 overlay overlay1 rounded"><a href="gallery-post.html"><img src="style/images/face2.jpg" alt="" /></a>
                  <figcaption>
                    <h5 class="text-uppercase from-top mb-0">See Gallery</h5>
                  </figcaption>
                </figure>
                <h4 class="mb-0">Resources</h4>
              </div>
              <!-- /.box -->
            </div>
            <!--/.item -->
          </div>
    </div>
    </div>
    </div>
    </div>


    

  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      user: {},
      affirmation: ""
    };
  },
  created: function() {
     axios.get(`/api/users/${this.$parent.getUserId()}`).then(response => {
      console.log(response.data);
      this.user = response.data
    })
  },
  methods: {
    generateSentence: function () {
      var adjectiveList = ["amazing", "wonderful", "fantastic", "inspiring", "courageous", "helpful", "determined", "smart", "imaginative", "super duper cool", "totally rad", "worthy of all the love in the world", "making the world better every day", "exuberant", "allowed to take up space", "beautiful inside and out", "making people proud every day", "exuberant", "dedicated", "compassionate", "capabable", "appreciated and loved", "talented", "deserving of love and care", "full of endless possibilities", "enough", "deserving of happiness and joy", "powerful"];
      var sentence = this.user.name + " is " + 
      adjectiveList[Math.floor(Math.random()*adjectiveList.length)] + " and can do anything!";

      console.log(sentence);
      return sentence;
    }
 



  }
};
</script>
