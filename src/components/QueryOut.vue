<template>
  <div class="queryOut_wrapper">
    <h6>{{ query }}</h6>
    <p>{{ result }}</p>
    <div v-for="(item, index) in res" :key="index">
      <p>{{ item.test?.value }}</p>
      <p>{{ item.obj?.value }}</p>
      <p>{{ item.pred?.value }}</p>
      <br />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api.js";

export default {
  computed: {
    result() {
      //let data = this.query;
      const limit = this.query?.find((item) => item.title == "Limit")?.value;
      console.log("limit", limit);

      const select = this.query?.find((item) => item.title == "Select")?.value;
      console.log("where", select);

      //this.getTrible(select);

      var query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT ${select} WHERE {
  ?sub ?pred ?obj .
} 
        LIMIT ${limit ? limit : 10}`;

      return query;
    },
    ...mapState({
      query: (state) => state.currentItems,
    }),
  },
  data() {
    return {
      res: [],
    };
  },
  methods: {
    async test(query) {
      const data = await api.fetch(query);
      console.log(data);
      this.res = data;
    },
    async getTrible(query) {
      console.log(await api.getTrible(query));
    },
  },
};
</script>

<style lang="scss">
.queryOut {
  &_wrapper {
    margin: 10px;
    padding: 10px;
    height: 40vh;
    width: calc(100% - 40px);
    min-width: 385px;
    background-color: #eee;
  }
}
</style>
