<template>
  <div class="queryOut_wrapper">
    <button @click="copyTC">Copy to clipboard</button>
    <p style="white-space: pre-line">{{ result }}</p>
    <!--     <h5>generated JSON</h5>
    <p>{{ query }}</p> -->
  </div>
</template>

<script>
import * as sparqly from "../../node_modules/sparqly/src/sparqly.js";

import { mapState } from "vuex";
import api from "@/api.js";

export default {
  computed: {
    result() {
      // Prefix is first verytime
      let queryString = "";

      const prefix = this.query.filter((item) => item.id === "prefix");

      prefix.forEach((item) => {
        //  console.log("check Item", item);
        queryString += `PREFIX ${item.hasInput[0].value}: <${item.hasInput[1].value}>` + "\n";
      });

      // build rest
      const rest = this.query.filter((item) => item.id != "prefix" && item.id != "limit");
      rest.forEach((item) => {
        let valuearr = [];
        item.hasInput.forEach((value) => {
          if (value.value != "") valuearr.push(value.value);
        });
        const valueString = valuearr.toString().replace(/\[\]/, "").replace(",", ", ");
        if (valueString != "") {
          queryString += "SELECT ";
          queryString += valueString + " ";
        }

        if (item.childs != {}) {
          let childValues = [];
          item.childs?.hasInput.forEach((value) => {
            if (value.value != "") childValues.push(value.value);
          });
          const valueStringChild = childValues.toString().replace(/\[\]/, "");
          if (childValues.length > 0) queryString += `WHERE { ${valueStringChild.replace(/,|,/g, " ")} .}`;
        }
        queryString += "\n";
      });

      // build end -> stuff that should come last
      const limit = this.query.filter((item) => item.id === "limit");

      limit.forEach((item) => {
        //  console.log("check Item", item);
        queryString += `Limit ${item.hasInput[0].value}` + "\n";
      });

      return queryString;
    },
    prettier() {
      console.log("res", this.result)
      return sparqly.pretty(this.result);
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
    copyTC() {
      console.log("tctcp", this.result);
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(this.result);
      }
      return Promise.reject("The Clipboard API is not available.");
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

    p {
      text-align: left;
    }
  }
}
</style>
