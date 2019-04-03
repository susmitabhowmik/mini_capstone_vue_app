<template>
  <div class="home">
    <h1>products: </h1>
    <div v-for="product in products">
    <h4>{{product.name }}</h4>
    <p>{{product.description }}</p>
    <p>${{product.price}}</p>
    <img v-bind:src="product.image_url">
  </div>
  </div>
</template>

<style>
img {
  width: 140px;
}
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