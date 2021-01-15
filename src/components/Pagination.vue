<template>
  <b-pagination
    v-model="page"
    :total-rows="total"
    :per-page="perPage"
    aria-controls="my-table"
    align="center"
    class="pagination"
    @input="updateData(page)"
    />
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    perPage: {
      type: [Number, String],
      required: true
    },
    currentPage: {
      type: [Number, String],
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      page: this.currentPage
    }
  },
  methods: {
    updateData (page) {
      this.$emit('paginationUpdate', page)
    }
  }
}
</script>