<template>
  <div class="item-search">
    <el-input
      v-model.trim="sarchValue"
      :disabled="isdisabled"
      class="searchInp"
      :placeholder="radio ? '选择右侧条件搜索/恢复则全部' : '点击恢复则为全部'"
    >
      <el-button slot="suffix" type="primary" icon="el-icon-search" class="mybtn" :disabled="isdisabled" @click="sendKwAItem" />
    </el-input>
    <el-radio-group v-model="radio">
      <el-radio v-if="item1" :label="item1">{{ item1 }}</el-radio>
      <el-radio v-if="item2" :label="item2">{{ item2 }}</el-radio>
      <el-radio v-if="item3" :label="item3">{{ item3 }}</el-radio>
      <el-radio v-if="item4" :label="item4">{{ item4 }}</el-radio>
    </el-radio-group>
    <!-- 下拉框1 -->
    <el-select v-if="options1" v-model="select1" placeholder="请选择" style="margin-left:20px" @change="changeSelect1">
      <el-option
        v-for="item in options1"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <!-- 下拉框2 -->
    <el-select v-if="options2" v-model="select2" placeholder="请选择" style="margin-left:20px" @change="changeSelect2">
      <el-option
        v-for="item in options2"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <!-- 恢复按钮 -->
    <el-button type="success" plain style="margin-left: 20px" @click="reload">恢复</el-button>
  </div>
</template>

<script>
export default {
  name: 'ItemSearch',
  props: ['item1', 'item2', 'item3', 'item4', 'options1', 'options2', 'isdisabled'],
  data() {
    return {
      sarchValue: '',
      radio: this.item1,
      select1: '',
      select2: ''
    }
  },
  methods: {
    sendKwAItem() {
      if (this.sarchValue) {
        this.$emit('clickSearch', { keyword: this.sarchValue, radio: this.radio })
        this.sarchValue = ''
      }
    },
    reload() {
      location.reload()
    },
    changeSelect1(v) {
      this.$emit('selected1', v)
    },
    changeSelect2(v) {
      this.$emit('selected2', v)
    }
  }
}
</script>

<style lang="scss" scoped>
.searchInp {
  width: 25%;
  margin-right: 30px;
}
.mybtn {
  position: relative;
  left: 4px;
}
</style>
