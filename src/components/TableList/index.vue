<template>
  <div class="table-list">
    <el-table
      :data="tdata"
      style="width: 100%"
      size="medium"
      v-bind="$attrs"
    >
      <!-- 根据计算出的表头名字，由于是英文的，需要通过过滤器去做个翻译，具体的词库只能等需要的时候手动添加 -->
      <el-table-column
        v-for="(item, index) in arr"
        :key="index"
        :label="arr[index] | transformToChinese"
      >

        <!-- :prop="arr[index]" -->
        <!-- 使用表格组件的作用域插槽替代prop属性，同样可以显示数据的内容 -->
        <template slot-scope="scope">

          {{ item === 'createTime' || item === 'updateTime' || item === 'type' ?
            formatDayAndType(scope.row[item])
            :
            scope.row[item] }}
        </template>
      </el-table-column>
      <!-- 这个没办法遍历，因为返回的数据没有这项。这个由组件使用者决定传入什么。用作用域插槽 -->
      <el-table-column v-if="handleshow" label="操作">
        <template slot-scope="scope">
          <!-- 把数据传出去 -->
          <slot name="handle" :iteminfo="scope" />
        </template>
      </el-table-column>

    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pagesize"
      @current-change="currentchange"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'TableList',
  // 父组件传进来的数据
  props: {
    // 组件使用时，如果需要操作项就要传入props开启，并传入插槽。
    handleshow: {
      type: Boolean,
      default: false
    },
    // 请求得到的表格全部数据
    tdata: {
      type: Array,
      default: () => []
    },
    pagesize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {

    }
  },
  computed: {
    // 通过父组件传进来的表格数据，计算出表头的名字放在数组里。

    arr() {
      const arr = Object.keys(this.tdata[0] || {})
      let blackList = []
      if (this.$store.state.user.type === '1') {
        blackList = ['id', 'userId', 'updateTime', 'createTime']
      } else {
        blackList = ['id', 'userId']
      }

      const newArr = [...arr]

      newArr.forEach((item, index) => {
        if (blackList.indexOf(item) !== -1) {
          arr.forEach((v, i) => {
            if (v === item) {
              arr.splice(i, 1)
            }
          })
        }
      })

      return arr
    }
  },
  watch: {

  },
  methods: {
    formatDayAndType(val) {
      var result = ''
      if (val > 10) {
        result = dayjs(val).format('YYYY-MM-DD HH:mm:ss')
      } else {
        switch (val) {
          case '0':
            result = '管理员'
            break
          case '1':
            result = '教师'
            break
          case '2':
            result = '学生'
            break
        }
      }
      return result
    },
    currentchange(p) {
      this.$emit('currentchange', p)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
