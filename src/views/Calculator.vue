<template>
  <div class="calculator">
    <b-form inline class="mb-3 align-items-center">
      <b-form-input
          v-model="firstInt"
          class="mb-2 mx-3 mb-sm-0"
      ></b-form-input>

      <b-form-select v-model="selected" :options="options"></b-form-select>

        <b-form-input
            v-model="secondInt"
            class="mb-2 mx-3 mb-sm-0"
        ></b-form-input>

      <b-form-input readonly
          v-model="answer"
          class="mb-2 mr-3 mb-sm-0"
      ></b-form-input>

      <b-button variant="primary" v-on:click="calculate">Calculate</b-button>
    </b-form>
    <b-list-group v-for="(calculation, index) in calculations" :key="index" class="mx-3">
      <b-list-group-item v-if="calculation.method === 'add'">{{ calculation.firstInt }} + {{ calculation.secondInt }} = {{ calculation.answer }}</b-list-group-item>
      <b-list-group-item v-else-if="calculation.method === 'subtract'">{{ calculation.firstInt }} - {{ calculation.secondInt }} = {{ calculation.answer }}</b-list-group-item>
      <b-list-group-item v-else-if="calculation.method === 'multiply'">{{ calculation.firstInt }} * {{ calculation.secondInt }} = {{ calculation.answer }}</b-list-group-item>
      <b-list-group-item v-else-if="calculation.method === 'divide'">{{ calculation.firstInt }} / {{ calculation.secondInt }} = {{ calculation.answer }}</b-list-group-item>
    </b-list-group>
    <div v-if="totalCalculations > calculationsPerPage">
      <Pagination :per-page="calculationsPerPage"
                  :current-page="currentPage"
                  :total="totalCalculations"
                  v-on:paginationUpdate="updatePagination"
                  class="mt-3"
                  />
    </div>
  </div>
</template>

<script>
import apiService from "@/apiService";
import Pagination from "@/components/Pagination";

export default {
  name: 'Calculator',
  components: {Pagination},
  data () {
    return {
      calculations: [],
      totalCalculations: '',
      calculationsPerPage: this.getPerPage(),
      currentPage: this.getPage(),
      backButtonClicked: false,
      firstInt: 0,
      secondInt: 0,
      answer: 0,
      selected: null,
      options: [
        { value: null, text: 'Choose Calculation' },
        { value: 'add', text: '+' },
        { value: 'subtract', text: '-' },
        { value: 'multiply', text: '*' },
        { value: 'divide', text: '/' }
      ]
    }
  },
  mounted () {
    this.getCalculations()
  },
  methods: {
    getCalculations() {
      apiService.getCalculations(this.currentPage, this.calculationsPerPage).then((response) => {
        this.totalCalculations = response.data.data.pagination.total
        this.calculations = response.data.data.results
      }).catch(() => {
      })
    },
    calculate() {
        if (this.selected === 'add') {
          apiService.add(this.firstInt, this.secondInt).then((response) => {
            this.answer = response.data.data.result
          }).catch(() => {
          })
        } else if (this.selected === 'subtract') {
          apiService.subtract(this.firstInt, this.secondInt).then((response) => {
            this.answer = response.data.data.result
          }).catch(() => {
          })
        } else if (this.selected === 'multiply') {
          apiService.multiply(this.firstInt, this.secondInt).then((response) => {
            this.answer = response.data.data.result
          }).catch(() => {
          })
        } else if (this.selected === 'divide') {
          apiService.divide(this.firstInt, this.secondInt).then((response) => {
            this.answer = response.data.data.result
          }).catch(() => {
          })
        }
    },
    updatePagination (page) {
      this.backButtonClicked = false
      this.currentPage = page
      if (this.$route.query.page !== this.currentPage) {
        this.$route.query.page = this.currentPage
        this.getCalculations()
      }
    },
    getPage () {
      if (this.$route.query.page && !isNaN(this.$route.query.page)) {
        return this.$route.query.page
      } else {
        return 1
      }
    },
    getPerPage () {
      if (this.$route.query.per_page && !isNaN(this.$route.query.per_page)) {
        return this.$route.query.per_page
      } else {
        return 5
      }
    }
  }
}
</script>

<style scoped>
  .calculator {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    align-content: center;
    color: #2c3e50;
  }
</style>