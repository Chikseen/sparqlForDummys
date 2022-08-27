<template>
  <div>
    <div class="layoutWrapper">
      <TileGet :components="components" />
      <BuilderComponent :components="components" />
    </div>
    <QueryOut />
  </div>
</template>

<script>
import TileGet from "@/components/TileGet";
import BuilderComponent from "@/components/BuilderComponent";
import QueryOut from "@/components/QueryOut";
import api from "@/api.js";

import { mapState } from "vuex";

export default {
  name: "SrarchView",
  components: {
    TileGet,
    BuilderComponent,
    QueryOut,
  },
  computed: {
    ...mapState({
      components: (state) => state.components,
    }),
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
