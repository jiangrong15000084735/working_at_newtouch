<template>
  <div class="pf-checkbox-group">
    <mdb-input ref="mck" @click.native="clickCheckbox(item, index, $event)" v-for="(item, index) in items" :key="index" type="checkbox" :checked="checked(index)" :label="item[labelName]" />
    <input hidden value="value" />
  </div>
</template>

<script>
export default {
  name: 'PfCheckboxGroup',
  props: {
    value: {
      required: true,
      type: Array
    },
    items: {
      required: true,
      type: Array
    },
    labelName: {
      required: false,
      type: String,
      default: 'label'
    },
    valueName: {
      required: false,
      type: String,
      default: 'value'
    }
  },
  methods: {
    clickCheckbox (item, i, e) {
      let value = item[this.valueName]
      let index = this.value.indexOf(value)
      let checked = index >= 0
      if (checked) {
        this.value.splice(index, 1)
      } else {
        this.value.push(value)
      }
      this.$emit('input', this.value)
      this.$refs.mck[i].innerChecked = !checked
    }
  },
  computed: {
    checked () {
      return function (index) {
        return this.value.indexOf(this.items[index][this.valueName])>=0
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .pf-checkbox-group
    display flex
    flex-wrap wrap
</style>
