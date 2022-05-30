<template>
  <div class="tileGetSelection" @dragover.prevent @dragenter.prevent>
    <div
      v-for="item in tilesToShow"
      :key="item.id"
      :class="['tileGetSelection_tile', toLigth?.some((id) => id === item.id) ? 'tileGetSelection_tile_high' : 'tileGetSelection_tile_not']"
      draggable="true"
      @dragstart="startDrag($event, components[item.id])"
    >
      {{ item.titel }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    components: { type: Object },
  },
  computed: {
    tilesToShow() {
      const items = Object.keys(this.components);
      let toPush = [];
      items.forEach((item) => {
        /*         if (this.toLigth) {
          const show = this.toLigth.some(item.id);
          toPush.push({ ...this.components[item], show: show });
        } else { */
        toPush.push({ ...this.components[item] });
        //   }
      });
      return toPush;
    },
    toLigth() {
      this.selectedElement;
      return this.components[this.selectedElement]?.allowChilds;
    },
    ...mapState({
      selectedElement: (state) => state.selectedElement,
    }),
  },
  data() {
    return {
      highlight: [],
    };
  },
  methods: {
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
      console.log("start", item);
    },
    doHighligth(id) {
      if (this.toLigth?.some(id)) return true;
      else return false;
    },
  },
};
</script>

<style lang="scss">
.tileGetSelection {
  //width: 30vw;
  height: 40vh;
  background-color: #eee;
  margin: 10px;
  padding: 10px;
  overflow-y: scroll;

  &_tile {
    background-color: rgb(253, 166, 166);
    margin-bottom: 10px;
    padding: 10px;

    &_high {
      background-color: rgb(255, 110, 110);
    }

    &_not {
      background-color: rgb(255, 197, 197);
    }
  }
}
</style>
