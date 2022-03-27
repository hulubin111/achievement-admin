<template>
  <el-card class="box-card">
    <div ref="box" class="box" />
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
import transform from '@/utils/tr11'
export default {
  name: 'Score',
  data() {
    return {
      data: {}
    }
  },
  computed: {
    category() {
      const blackList = ['名字', 'id', 'userId', '创建时间', '更新时间']
      const arr = Object.keys(this.data)
      const chineseArr = []
      arr.forEach(item => {
        const r = transform(item)
        chineseArr.push(r)
      })
      const newArr = [...chineseArr]

      newArr.forEach((item, index) => {
        if (blackList.indexOf(item) !== -1) {
          chineseArr.forEach((v, i) => {
            if (v === item) {
              chineseArr.splice(i, 1)
            }
          })
        }
      })

      return chineseArr
    },
    category2() {
      const blackList = ['name', 'id', 'userId', 'createTime', 'updateTime']
      const arr = Object.keys(this.data)

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
    },
    score() {
      const scoreArr = []
      this.category2.forEach(item => {
        scoreArr.push(parseInt(this.data[item]))
      })
      return scoreArr
    }
  },
  mounted() {
    this.getScore().then(() => {
      var myChart = echarts.init(this.$refs.box)
      myChart.setOption({
        title: {
          text: `${this.data.name}的体测成绩`,
          textStyle: {
            fontFamily: '楷体'
          }
        },
        tooltip: {
          show: true
        },

        xAxis: {
          type: 'category',
          data: this.category,
          axisLabel: {
            interval: 0
          }
        },
        yAxis: {
          axisLine: {
            show: true
          },
          axisTick: {
            show: true
          }
        },
        series: [
          {
            name: '柱状图',
            type: 'bar',
            data: this.score,
            color: '#87c0de'
          },
          {
            name: '折线图',
            type: 'line',
            data: this.score,
            color: '#d0a5ba'
          }
        ],
        legend: {
          data: ['柱状图', '折线图']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {
              readOnly: false
            },
            magicType: {
              type: ['line', 'bar']
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [{}]

      })
    }).catch((e) => {

    })
  },
  methods: {
    async getScore() {
      try {
        const result = await this.$API.student.getScore(sessionStorage.getItem('USERID'))
        // console.log(result)
        this.data = result
        return 'ok'
      } catch (error) {
        return Promise.reject(new Error('faile'))
      }
    }
  }
}

</script>

<style scoped>
.box-card {
  height: 630px;
  margin-top: 20px;
}
.box {
  height: 600px;
}

</style>
