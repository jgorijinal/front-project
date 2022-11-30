<template>
  <div class="">
    <m-popover>
      <!--具名插槽 reference-->
      <template #reference>
        <div  class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100">
          <img
          class="w-4 h-4 rounded-sm"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F0c%2Fef%2Fa0%2F0cefa0f17b83255217eddc20b15395f9.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651074011&t=ba5d64079381425813e4c269bcac1a1b"
        />
         <!-- 下箭头 -->
         <m-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 "
        ></m-svg-icon>
        <!-- vip 标记 -->
        <m-svg-icon
          name="vip"
          class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
        ></m-svg-icon>
        </div>
      </template>
      <!--默认插槽: 气泡框里面的内容-->
      <ul>
        <template v-for="item in menuArr" :key="item.id"> 
          <li class="flex items-center p-1 rounded-md hover:bg-zinc-100 cursor-pointer">
            <m-svg-icon :name="item.icon" class="w-1.5 h-1.5 mr-1"/>
          <span class="text-sm">{{item.title}}</span>
        </li>
        </template>
      </ul>
    </m-popover>  
  </div>
</template>
<script setup>
// menu 数据源
const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path:'/profile'
  },
  {
    id: 1,
    title: '升级 VIP',
    icon: 'vip-profile',
    path:'/member'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path:''
  }
]
</script>
<style lang="scss" scoped>
  
</style>