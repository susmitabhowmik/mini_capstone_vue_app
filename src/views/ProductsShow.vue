<template>
  <div class="root">
    This is the show page
      <h4>{{product.name }}</h4>
      <p>{{product.description }}</p>
      <p>${{product.price}}</p>
      <p><img v-bind:src="product.image_url"></p>
      <p><router-link v-bind:to=" '/products/' + product.id + '/edit'"> Edit this product </router-link></p>
    </div>
</template>

<script>

import axios from "axios";
export default {
  data: function() {
    return {
      product: {
        name: "",
        description: "" ,
        price: "" ,
        image_url: ""
      }
    };
  },
  created:function() {
    axios.get("/api/products/" + this.$route.params.id).then(response => {
      console.log(response.data);
      this.product = response.data;
    });
  },
  methods: {}
};
</script>