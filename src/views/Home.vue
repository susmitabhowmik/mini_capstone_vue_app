<template>
  <div class="home">
    <h1>products: {{products }}</h1>
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
      products: []
    };
  },
  created: function() {
    //ruby
    //response = HTTP.get("/api/products")
    //products = response.parse

    // axios.get("/api/products").then(function(response) {
    axios.get("/api/products").then(response => {

      this.products = response.data;
      // console.log(response.data);
    });
  },
  methods: {}
};
</script>