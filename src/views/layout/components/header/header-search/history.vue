<template>
  <div>
    <div class="flex items-center">
      <span class="text-sm dark:text-zinc-400">最近搜索</span>
      <m-svg-icon 
        name="delete"
        class="w-2.5 h-2.5 p-0.5 hover:bg-zinc-100 dark:hover:bg-zinc-500 ml-1 duration-200 cursor-pointer rounded-sm"
        fillClass="fill-zinc-400"
        @click.stop="deleteAllItems"
      ></m-svg-icon>  
    </div>
    <div class="flex my-1" v-if="$store.getters.histories !== []">
      <template v-for="item,index in $store.getters.histories" :key="index">
        <div class="bg-zinc-100 dark:bg-zinc-400 dark:hover:bg-zinc-500 flex items-center cursor-pointer hover:bg-zinc-200 rounded-sm 
          px-1 py-0.5 duration-200 mr-1 mb-1"
          @click="itemClick(item)"
          >
          <span class="text-sm font-bold">{{item}}</span>
          <m-svg-icon
            name="input-delete"
            class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm  dark:bg-zinc-400 hover:bg-zinc-100
              dark:hover:bg-zinc-700"
            @click.stop="deleteItem(index)"
          ></m-svg-icon>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
const EMITS_ITEM_CLICK = 'itemClick'
</script>
<script setup>
import { useStore } from 'vuex'
import { confirm } from '@/libs/confirm'
const emits = defineEmits([EMITS_ITEM_CLICK])

const store = useStore()

// 点击了某一个搜索历史 , 触发事件
const itemClick = (item) => {
  console.log('点击了搜索历史')
  emits(EMITS_ITEM_CLICK, item)
}

// 删除一个搜索历史
const deleteItem = (index) => {
  console.log('删除搜索历史')
  store.commit('search/deleteHistory', index)
}

// 清空搜索历史
const deleteAllItems = () => {
  // TODO : 弹出对话框提示, 是否全部删除
  console.log('删除全部')
  confirm('提示', '要删除所有历史记录吗?', '取消', '确定')
    .then(() => {
      console.log('点击了确定')
      store.commit('search/deleteAllHistory')
    }).catch(() => {
      console.log('点击了取消')
    })
}
</script>