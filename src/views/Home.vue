<template>
  <div class="home">

    <h3 v-if="$parent.isLoggedIn()">{{generateSentence()}}</h3>
    <h3 v-if="$parent.isLoggedIn()">Your pronouns are: {{user.pronouns}}</h3>

    <p>Welcome to Butterfly Park!</p>

    <p v-if="$parent.isLoggedIn()">This is your space to explore who you are, who you are becoming, and who you want to be.</p>

    

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
