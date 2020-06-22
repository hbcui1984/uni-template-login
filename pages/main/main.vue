<template>
  <view class="content">
    <view v-if="hasLogin" class="hello">
      <view class="title">
        您好 {{userName}}，您已成功登录。
      </view>

      <view class="list">
        <view class="title list-item">
          <view>股票</view>
          <view>购买日期</view>
          <view>购买价格</view>
          <view>卖出日期</view>
          <view>卖出价格</view>
          <view>交易数量</view>
          <view>盈利</view>
          <view>比例</view>
        </view>
        <view v-for="(item,index) in stockList" :key="index" class="list-item">
          <view>{{item.stock_name}}</view>
          <view>{{item.buy_date}} 买入</view>
          <view>{{item.buy_price}} 买入价格</view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
  import uniList from "@/components/uni-list/uni-list.vue"
  import uniListItem from "@/components/uni-list-item/uni-list-item.vue"

  import {
    mapState
  } from 'vuex'

  export default {
    data() {
      return {
        stockList: [{
          stock_name: '股票名称'
        }]
      }
    },
    components: {
      uniList,
      uniListItem
    },
    computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
    onLoad() {
      if (!this.hasLogin) {
        uni.showModal({
          title: '未登录',
          content: '您未登录，需要登录后才能继续',
          /**
           * 如果需要强制登录，不显示取消按钮
           */
          showCancel: !this.forcedLogin,
          success: (res) => {
            if (res.confirm) {
              /**
               * 如果需要强制登录，使用reLaunch方式
               */
              if (this.forcedLogin) {
                uni.reLaunch({
                  url: '../login/login'
                });
              } else {
                uni.navigateTo({
                  url: '../login/login'
                });
              }
            }
          }
        });
      } else {
        //获取股票列表
      }
    }
  }
</script>

<style>
  .hello {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .title {
    color: #8f8f94;
    margin-top: 25px;
  }

  .ul {
    font-size: 15px;
    color: #8f8f94;
    margin-top: 25px;
  }

  .ul>view {
    line-height: 25px;
  }
  
  .title>view{
    display: flex;
    flex: 1;
    flex-direction: row;
  }
  
</style>
