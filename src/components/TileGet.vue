<template>
  <div class="tileGetSelection" @dragover.prevent @dragenter.prevent>
    <div
      v-for="item in tilesToShow"
      :key="item.id"
      :class="[
        'tileGetSelection_tile',
        toLigth?.some((id) => id === item.id) || (!item.needRoot && selectedElement == '') ? 'tileGetSelection_tile_high' : 'tileGetSelection_tile_not',
      ]"
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
        toPush.push({ ...this.components[item] });
      });
      return toPush;
    },
    toLigth() {
      return this.components[this.selectedElement]?.allowChilds;
    },
    // dont judge me i am super lazy  and tired rn
    toLigth2() {
      return this.components.filter((item) => item.needRoot === true);
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
    transition: all 0.5s 0.1s;
    &_high {
      background-color: rgb(255, 110, 110);
    }

    &_not {
      background-color: #b0b0b0;
      color: #666666;
    }
  }
}
</style>
