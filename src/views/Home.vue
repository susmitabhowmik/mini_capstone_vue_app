<template>
  <div class="home">
    <h1> {{message}} </h1>
    <p>Name:<input type="text" v-model="newProductTitle">
    <p>Description:<input type="text" v-model="newProductDescription">
    <p>Price:<input type="text" v-model="newProductPrice">
     <p>Image Url:<input type="text" v-model="newProductImageUrl">

    <button v-on:click="addNewProduct()">Add a new product</button>


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
      message: "Products",
      products: [],
      newProductPrice: "",
      newProductDescription: "",
      newProductTitle: "",
      newProductImageUrl: ""
    };
  },
  created: function() {
    //ruby
    //response = HTTP.get("/api/products")
    //products = response.parse

    // axios.get("/api/products").then(function(response) {
    axios.get("/api/products").then(response => {

      this.products = response.data;
      console.log(response.data);
    });
  },
  methods: {
    addNewProduct: function() {
      console.log('adding a new product');
      //Make a request to the api to the create action
      // response = HTTP.get("/api/products")
      // products = response.parse
      var params = {
        name: this.newProductTitle,
        description: this.newProductDescription,
        price: this.newProductPrice,
        image_url: this.newProductImageUrl

      }; //sent as body/form params 

      axios.post("/api/products", params).then(response=>{
        console.log(response);
        this.products.push(response.data);
      });
    }
  }
};
</script>