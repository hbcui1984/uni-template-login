<template>
  <view>
    <view class="input-group">
      <view class="input-row border">
        <text class="title">股票：</text>
        <input type="text" clearable focus v-model="stockName" placeholder="股票名称"></input>
      </view>
      <view class="input-row">
        <text class="title">买入价格：</text>
        <input type="number" v-model="buyPrice" placeholder=""></input>
      </view>
      <view class="input-row">
        <text class="title">买入数量：</text>
        <input type="number" v-model="count" placeholder=""></input>
      </view>
      <view class="input-row">
        <text class="title">买入日期：</text>
        <picker mode="date" :value="buy_date" start="2015-01-01" :end="endDate" @change="bindDateChange">
          <view>{{buy_date}}</view>
        </picker>
      </view>
    </view>
    <view class="">
      <button type="primary" @tap="buyStock">添加</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      const today = this.getDate({
        format: true
      })
      return {
        stockName: '',
        buyPrice: 0,
        count:0,
        buy_date: today
      }
    },
    computed: {
      endDate() {
        return this.getDate('end');
      }
    },
    methods: {
      getDate(type) {
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (type === 'start') {
          year = year - 60;
        } else if (type === 'end') {
          year = year + 2;
        }
        month = month > 9 ? month : '0' + month;;
        day = day > 9 ? day : '0' + day;
        return `${year}-${month}-${day}`;
      },
      bindDateChange(e){
         this.buy_date = e.target.value
      },
      buyStock() {
        
        alert(this.buy_date)
        
        uniCloud.callFunction({
          name: 'stock',
          data: {
            action: 'buy',
            params: {
              stock_name: this.stockName,
              count: this.count,
              buy_price: this.buyPrice,
              buy_date:this.buy_date
            }
          },
          success(e) {
            console.log('success',e);
          },
          fail(e) {
            console.log('fail',e);
          }
        })
      }

    }
  }
</script>

<style>

</style>
