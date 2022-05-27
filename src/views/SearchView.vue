<template>
  <div>
    <div class="layoutWrapper">
      <TileGet :tilesToShow="tilesToShow" />
      <BuilderComponent :tilesToShow="tilesToShow" />
    </div>
    <QueryOut />
    <button @click="test">make req</button>
  </div>
</template>

<script>
import TileGet from "@/components/TileGet";
import BuilderComponent from "@/components/BuilderComponent";
import QueryOut from "@/components/QueryOut";
import api from "@/api.js";

export default {
  name: "SrarchView",
  components: {
    TileGet,
    BuilderComponent,
    QueryOut,
  },
  computed: {
    tilesToShow() {
      // load from json
      return [
        {
          id: 0,
          title: "Select",
          hasText: true,
          value: "film",
        },
        {
          id: 2,
          title: "Limit",
          hasNumber: true,
          value: 10,
        },
        {
          id: 1,
          title: "DUMMY Item A",
          list: 0,
        },
        {
          id: 3,
          title: "DUMMY Item B",
          list: 0,
        },
        {
          id: 4,
          title: "DUMMY Item C",
          list: 0,
        },
      ];
    },
  },
  methods: {
    async test() {
      console.log(await api.fetch());
    },
  },
};
</script>

<style>
.layoutWrapper {
  display: grid;
  grid-template-columns: minmax(175px, 40vw) minmax(250px, 60vw);
}
</style>
