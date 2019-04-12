<template>
  <div class="home">
    <h1> {{message}} </h1>
   

    <input type="text" v-model="priceFilter">

<!--     <div v-for="product in products">
 -->     
      <div v-for="product in filterBy(products, priceFilter, 'price')">
      <h4>{{product.name }}</h4>
      <p>{{product.description }}</p>
      <p>${{product.price}}</p>
      <img v-bind:src="product.image_url">

      <button v-on:click="toggleInfo(product)">Show more info</button>
      <div v-if="product === currentProduct">
       <!-- When user modifies these it will update the lines above on the index page -->
       <p>Name:<input type="text" v-model="product.name"></p>
       <p>Description:<input type="text" v-model="product.description"></p>
       <p>Price:<input type="text" v-model="product.price"></p>
       <p>Image Url:<input type="text" v-model="product.image_url"></p>
       <button v-on:click="updateProduct(product)">Update the product</button>
      </div>
      <button v-on:click="deleteProduct(product)">Remove this product</button>
    </div>
  </div>
</template>

<style>
  img {
    width: 200px;
    length:200px;
  }
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "Products",
      products: [],
      priceFilter: "",
      newProductPrice: "",
      newProductDescription: "",
      newProductTitle: "",
      newProductImageUrl: "",
      currentProduct: {}
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
        // console.log(response);
        this.products.push(response.data);
      });
    },
    toggleInfo: function(theProduct) {
      if (this.currentProduct === theProduct) {
        //already looking at the info
        this.currentProduct = {};
      } else {
        //we can't see the info
        this.currentProduct = theProduct;
      }
      console.log('toggling info...');
    },
    updateProduct: function(theProduct) {
      console.log("updating the product...");
      var params = {
        name: theProduct.name,
        description: theProduct.description,
        price: theProduct.price,
        image_url: theProduct.image_url
      };
      axios.patch("/api/products/" + theProduct.id, params).then(response=>{
      });
    },
    deleteProduct: function(theProduct) {
      // make an HTTP request using axios to the destroy part of the API (delete from database)
      axios.delete("/api/products/" + theProduct.id).then(response => {
        console.log(response);
        // delete the product from the products array
        //find the index of the recipe in the array
        var index = this.products.indexOf(theProduct);
        //remove the item based on that index
        this.products.splice(index, 1);
      });
    }
  }
};
</script>