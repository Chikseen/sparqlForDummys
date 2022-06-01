<template>
  <div class="queryOut_wrapper">
    <button @click="copyTC">Copy to clipboard</button>
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
    copyTC() {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(this.res);
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
  }
}
</style>
