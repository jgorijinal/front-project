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
    <!-- <div v-else class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-lg">加载中....</div> -->
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from 'vue'
import { getImgElements, getAllImgs, onCompleteImgs,getMinHeightColumn,getMinHeight,getMaxHeight } from './utils'
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
	  // 遍历数据源
    props.data.forEach((item, index) => {
    // 避免重复计算
    if (item._style) {
      return
    }
    // 生成 _style 属性
    item._style = {}
    // left
    item._style.left = getItemLeft()
    // top
    item._style.top = getItemTop()
    // 指定列高度自增
    increasingHeight(index)
  })

  // 指定容器高度
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}

// 触发计算
watch(() => props.data, (newVal) => {
  // 重置数据源
  const resetColumnHeight = newVal.every((item) => !item._style)
    if (resetColumnHeight) {
      // 构建高度记录容器
      useColumnHeightObj()
    }
  nextTick(() => {
    if (props.picturePreReading) {
      waitImgComplete() 
    } else {
      useItemHeight()
    }
  })
}, {
  immediate: true,
  deep:true
})

/**
 * 返回下一个 item 的 left
 */
const getItemLeft = () => {
  // 最小高度所在的列 * (列宽 + 间距)
  const column = getMinHeightColumn(columnHeightObj.value)
  return (
    column * (columnWidth.value + props.columnSpacing) + containerLeft.value
  )
}

/**
 * 返回下一个 item 的 top
 */
 const getItemTop = () => {
  // 列高对象中的最小的高度
  return getMinHeight(columnHeightObj.value)
}
/**
 * 指定列高度自增
 */
 const increasingHeight = (index) => {
	// 最小高度所在的列  
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
  // 该列高度自增
  columnHeightObj.value[minHeightColumn] +=
    itemHeights[index] + props.rowSpacing
}
/**
 * 在组件销毁时，清除所有的 _style
 */
 onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})

/**
 * 监听列数变化，重新构建瀑布流
 */
const reset = () => {
  // 延迟 100 毫秒，否则会导致宽度计算不正确
  setTimeout(() => {
    // 重新计算列宽
    useColumnWidth()
    // 重置所有的定位数据，因为 data 中进行了深度监听，所以该操作会触发 data 的 watch
    props.data.forEach((item) => {
      item._style = null
    })
  }, 100)
}

/**
 * 监听列数变化
 */
watch(
  () => props.column,
  () => {
    // // 在 picturePreReading 为 true 的前提下，需要首先为列宽滞空，列宽滞空之后，会取消瀑布流渲染
    // columnWidth.value = 0
    // reset()
    if (props.picturePreReading) {
      // 在 picturePreReading 为 true 的前提下，需要首先为列宽滞空，列宽滞空之后，会取消瀑布流渲染
      columnWidth.value = 0
      // 等待页面渲染之后，重新执行计算。否则在 item 没有指定过高度的前提下，计算出的 item 高度会不正确
      nextTick(reset)
    } else {
      reset()
    }
  }
)


</script>