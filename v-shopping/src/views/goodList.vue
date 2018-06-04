<template>
<div>
<vheader></vheader>
<vbread></vbread>
<div class="accessory-result-page accessory-page">
  <div class="container">
    <div class="filter-nav">
      <span class="sortby">Sort by:</span>
      <a href="#cart" class="default cur">购物车</a>
      <a href="javascript:void(0)" @click="toggleGoods" class="price">Price ↑ ↓ <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
      <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
    </div>
    <div class="accessory-result">
      <!-- filter -->
      <div class="filter stopPop" id="filter">
        <dl class="filter-price">
          <dt>Price:</dt>
          <dd><a href="javascript:void(0)">All</a></dd>
          <dd>
            <a href="javascript:void(0)">0 - 100</a>
            <a href="javascript:void(0)">100 - 500</a>
            <a href="javascript:void(0)">500 - 1000</a>
            <a href="javascript:void(0)">1000 - 5000</a>
          </dd>
        </dl>
      </div>

      <!-- search result accessories list -->
      <div class="accessory-list-wrap">
        <div class="accessory-list col-4">
          <ul>
            <li v-for="good in goods">
              <div class="pic">
                <a href="#"><img :src="'/static/'+good.productImage" alt=""></a>
              </div>
              <div class="main">
                <div class="name">{{good.productName}}</div>
                <div class="price">{{good.salePrice}}</div>
                <div class="btn-area">
                  <a href="javascript:;" class="btn btn--m" @click="addCart(good.productId)">加入购物车</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
<vfooter></vfooter>
</div>
  
</template>

<script>
import vheader from '../components/vheader/vheader';
import vfooter from '../components/vfooter/vfooter';
import vbread from '../components/vbread/vbread';
export default {
  data(){
      return {
          goods:[],
          sortFlag:true,
      }
  },
  
  created(){
      this.getGoodsList();
  },

  methods:{
      getGoodsList(){
        let param={
          sort:this.sortFlag?1:-1
        }
        this.$http.get('/goods',{params:param}).then((response)=>{
           response=response.body;
           if(response.status===0){
             this.goods=response.data.list
             console.log(this.goods)
        }})
      },
      toggleGoods(){
        this.sortFlag=!this.sortFlag;
        this.getGoodsList();
      },
      addCart(productId){
        this.$http.post('/goods/addcart',{productId:productId}).then((response)=>{
          response=response.body;
          if(response.status===0){
            alert('add success')
          }
        })      
      }

  },
  
  components:{
      vheader,
      vfooter,
      vbread
  }
}
</script>

<style>
 @import './../assets/css/base.css';
 @import './../assets/css/product.css';
 
</style>

