<template>
  <div class="relative"
    ref="containerRef"
    :style="{
      height:containerHeight + 'px' // 因为当前为 relative 布局，所以需要主动指定高度
    }"
  >
    <!-- 因为列数不确定，所以需要根据列数计算每列的宽度，所以等待列宽计算完成，并且有了数据源之后进行渲染 -->
    <template v-if="columnWidth && data.length">
      <!-- 通过动态的 style 来去计算对应的列宽、left、top -->
      <div
        class="m-waterfall-item absolute duration-300"
        v-for="(item, index) in data"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
        :key="nodeKey ? item[nodeKey] : index"
      >
        <slot :item="item" :width="columnWidth" :index="index"></slot>
      </div>
    </template>
    <!-- 可以给一个加载中的描述，没有也无所谓 -->
    <div v-else>加载中...</div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 唯一的标识 key
  nodeKey: {
    type: String,
  },
  // 列数
  column: {
    type: Number,
    default:2
  },
  // 列间距
  columnSpacing: {
    type: Number,
    default:20
  },
  //行间距
  rowSpacing: {
    type: Number,
    default:20
  },
  // 是否进行图片预加载
  picturePreReading: {
    type: Boolean,
    default: true
  }
})
// 容器的总高度
const containerHeight = ref(0)
// 记录每列高度的容器。key：所在列  value：列高
const columnHeightObj = ref({})
// 构建记录各列的高度的对象
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}
// 容器 实例
const containerRef = ref(null)
// 容器总宽度(不包含padding,margin,border)
const containerWidth  = ref(0)
// 容器左边距，计算 item left 时，需要使用定位
const containerLeft = ref(0)
// 计算容器的宽度函数
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = window.getComputedStyle(containerRef.value, null)
  // 容器左边距
  containerLeft.value = parseFloat(paddingLeft)
  // 容器宽度
  containerWidth.value = containerRef.value.offsetWidth - parseFloat(paddingRight)- parseFloat(paddingLeft)
}

//列宽
const columnWidth = ref(0)
// 列间距合计
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing
})

// 计算列宽
const useColumnWidth = () => {
  useContainerWidth()
  columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.column
}

onMounted(() => {
  useColumnWidth()
  console.log(columnWidth.value)
})

</script>
<style lang="scss" scoped>
  
</style>