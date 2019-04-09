<template>
  <div class="root">
    This is the edit page
    <div v-for="error in errors">
      {{ error }}
    </div>

  <form v-on:submit.prevent="updateProduct()">
    <p>Name:<input type="text" v-model="product.name"></p>
    <p>Description:<input type="text" v-model="product.description"></p>
    <p>Price:<input type="text" v-model="product.price"></p>
    <p>Image Url:<input type="text" v-model="product.image_url"></p>
<button v-on:click="updateProduct(product)">Update the product</button>
      </form>
      <button v-on:click="deleteProduct(product)">Remove this product</button>
  </div>

</template>

<script>
import axios from "axios"

export default {
  data: function() {
    return {
      product: {
        name: "",
        description: "" ,
        price: "" ,
        image_url: ""
      },
      errors: []
    };
  },
  created:function() {
    axios.get("/api/products/" + this.$route.params.id).then(response => {
      console.log(response.data);
      this.product = response.data;
    });
  },
  methods: {
    updateProduct: function() {
      console.log("updating the product...");
      var params = {
        name: this.newProductTitle,
        description: this.newProductDescription,
        price: this.newProductPrice,
        image_url: this.newProductImageUrl

      };
      console.log(params);  
      axios.patch("/api/products/" + this.$route.params.id, params).then(response=>{
        console.log('Things are going well');
        console.log(response);
        this.$router.push("/products/" + this.$route.params.id);
        // this.products.push(response.data);
      }).catch(error => {
        console.log('Things are not going well');
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
      });
    },
    deleteProduct: function() {
      console.log('deleting a product...');
      axios.delete("/api/products/" + this.$route.params.id).then(response => {
        this.$router.push("/");
      })
    }
  }
};
</script>