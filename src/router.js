import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Test from './views/Test.vue';
import ProductsNew from './views/ProductsNew.vue';
import ProductsShow from './views/ProductsShow.vue';
import ProductsEdit from './views/ProductsEdit.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/products/:id/edit',
      name: 'products-edit',
      component: ProductsEdit
    },
    {
      path: '/products/new',
      name: 'products-new',
      component: ProductsNew
    },
    {
      path: '/products/:id',
      name: 'products-show',
      component: ProductsShow
    },  
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
});
