<template>
  <div class="root">
    Welcome to the /products/new page
    <p>Name:<input type="text" v-model="newProductTitle"></p>
    <p>Description:<input type="text" v-model="newProductDescription"></p>
    <p>Price:<input type="text" v-model="newProductPrice"></p>
    <p>Image Url:<input type="text" v-model="newProductImageUrl"></p>

    <button v-on:click="addNewProduct()">Add a new product</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Products",
      newProductPrice: "",
      newProductDescription: "",
      newProductTitle: "",
      newProductImageUrl: "",
    };
  },
  created: function() {},
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
    }
  },
};

</script>