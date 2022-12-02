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
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { getImgElements, getAllImgs, onCompleteImgs } from './utils'
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
})

// 需要图片预加载时
// item 高度集合
let itemHeights = []
/**
 * 监听图片加载完成
 */
const waitImgComplete = () => {
  itemHeights = []
  // 拿到所有 item 元素
  const itemElements = [...document.getElementsByClassName("m-waterfall-item")]

  // 获取所有 img 标签
  const imgElements = getImgElements(itemElements)

  // 拿到所有 img 标签的 src 路径 
  const allImgs = getAllImgs(imgElements)
  // 监听所有图片全部加载完(内部已经使用了 promise 封装)
  onCompleteImgs(allImgs).then(res => {
    // 这里图片已经加载完成
    itemElements.forEach((el) => {
      itemHeights.push(el.offsetHeight)
    })
    // 渲染位置
    useItemLocation()
})
}
// setTimeout(() => {
//   waitImgComplete()
// }, 1000)

/**
 * 图片不需要预加载时，计算 item 高度
 */
const useItemHeight = () => {
  itemHeights = []
  // 拿到所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]

  // 计算 item 高度
  itemElements.forEach((el) => {
    // 依据传入数据计算出的 img 高度
    itemHeights.push(el.offsetHeight)
  })
  // 渲染位置
  useItemLocation()
}

/**
 * 为每个 item 生成位置属性
 */
const useItemLocation = () => {
	console.log(itemHeights)
}

// 触发计算
watch(() => props.data, (newVal) => {
  if (newVal) {
    nextTick(() => {
    if (props.picturePreReading) {
      waitImgComplete() 
    } else {
      useItemHeight()
    }
  })
  }
}, {
  immediate: true,
  deep:true
})



</script>
<style lang="scss" scoped>
  
</style>