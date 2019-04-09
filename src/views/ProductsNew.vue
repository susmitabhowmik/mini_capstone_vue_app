<template>
  <div class="root">
    Welcome to the /products/new page
    <div v-for="error in errors">
        {{ error }}
    </div>

    <form v-on:submit.prevent="addNewProduct()">
    <p>Name:<input type="text" v-model="newProductTitle"></p>
    <p>Description:<input type="text" v-model="newProductDescription"></p>
    <p>Price:<input type="text" v-model="newProductPrice"></p>
    <p>Image Url:<input type="text" v-model="newProductImageUrl"></p>
<!--     <input type="submit" value="Add a new product">
 -->
    <button v-on:click="addNewProduct()">Add a new product</button>
  </form>
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
      errors: []
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
        console.log('Things are going well');
        console.log(response);
        this.$router.push("/");
        // this.products.push(response.data);
      }).catch(error => {
        console.log('Things are not going well');
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
      });
    }
  },
};

</script>