<template>
  <div class="group relative bg-white p-0.5 rounded-xl hover:bg-red-100 duration-200">
    <div>
      <!--图标-->
      <m-svg-icon
        name="search"
        class="w-1.5 h-1.5 absolute top-[50%] left-2 translate-y-[-50%]"
        color="#707070"
      ></m-svg-icon>
      <!--input输入框-->
      <!-- <input type="text" 
        placeholder="搜索" 
        class="h-[44px] block w-full rounded-xl text-sm tracking-wide pl-4 outline-0"  
      > -->
      <input
        class="block w-full h-[44px] pl-4 text-sm outline-0
          bg-zinc-100 caret-zinc-400 rounded-xl text-zinc-900 tracking-wide
          font-semibold border border-zinc-100 duration-500 group-hover:bg-white 
          group-hover:border-zinc-200 focus:border-red-300"
        type="text"
        placeholder="搜索"
      />
      <!--删除按钮-->
      <m-svg-icon
        name="input-delete"
        class="h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] right-9 duration-500 cursor-pointer"
        color="#707070"
      ></m-svg-icon>
      <!--分割线-->
      <div class="opacity-0 group-hover:opacity-[100%] absolute w-[2px] h-1.5 bg-zinc-500/80 right-[62px] top-[50%] translate-y-[-50%] "></div>
      <!--TODO: 搜索按钮(通用组件)-->
      <m-button
        class="absolute translate-y-[-50%] top-[50%] right-1 rounded-lg"
        icon="search"
        iconColor="#ffffff"
        type="main"
      ></m-button>

    </div>
    <!--下拉区-->
    <transition name="slide">
      <div
        class="max-h-[368px] w-full text-base overflow-auto bg-white absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 duration-200 hover:shadow-3xl"
      >
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>
<script setup>
</script>
<style lang="">
  
</style>