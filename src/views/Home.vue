<template>
  <div class="home">

    <h1>{{generateSentence()}}</h1>

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
      var adjectiveList = ["amazing", "wonderful", "fantastic"];
      var sentence = this.user.name + " is " + 
      adjectiveList[Math.floor(Math.random()*adjectiveList.length)] + " and can do anything!";

      console.log(sentence);
      this.affirmation = sentence;
    }
 



  }
};
</script>
