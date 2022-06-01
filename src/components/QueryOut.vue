<template>
  <div class="queryOut_wrapper">
    <p style="white-space: pre-line">{{ result }}</p>

    <h5>generated JSON</h5>
    <h6>{{ JSON.stringify(query, null, 2) }}</h6>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api.js";

export default {
  computed: {
    /*     result() {
      //let data = this.query;
      const limit = this.query?.find((item) => item.title == "Limit")?.value;
      console.log("limit", limit);

      const select = this.query?.find((item) => item.title == "Select")?.value;
      console.log("where", select);

      //this.getTrible(select);

      // create Query
      var query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          SELECT ${select} WHERE {
            ?sub ?pred ?obj .
          }
        LIMIT ${limit ? limit : 10}`;

      return query;
    }, */
    result() {
      // Prefix is first verytime
      let queryString = "";

      const prefix = this.query.filter((item) => item.id === "prefix");

      prefix.forEach((item) => {
        //  console.log("check Item", item);
        queryString += `PREFIX ${item.hasInput[0].value}: <${item.hasInput[1].value}>` + "\n";
      });

      // build rest
      const rest = this.query.filter((item) => item.id != "prefix");
      rest.forEach((item) => {
        queryString += "SELECT ";

        let valuearr = [];
        item.hasInput.forEach((value) => {
          if (value.value != "") valuearr.push(value.value);
        });
        const valueString = valuearr.toString().replace(/\[\]/, "").replace(",", ", ");
        queryString += valueString + " ";
        /* 
        item.hasInput.forEach((para, i) => {
          if (para.value != "") {
            queryString += ` ${para.value} `;
          }
          if (item.hasInput[i + 1] != undefined && item.hasInput[i + 1].value != "") {
            queryString += `,`;
          }
        }); */

        if (item.childs != {}) {
          let childValues = [];
          item.childs?.hasInput.forEach((value) => {
            if (value.value != "") childValues.push(value.value);
          });
          const valueStringChild = childValues.toString().replace(/\[\]/, "").replace(",", ", ");
          if (childValues.length > 0) queryString += `WHERE { ${valueStringChild} .}`;
        }
        queryString += "\n";
      });

      return queryString;
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
