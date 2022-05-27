<template>
  <div class="tileGetSelection" @dragover.prevent @dragenter.prevent>
    <div v-for="item in tilesToShow" :key="item.title" class="tileGetSelection_tile" draggable="true" @dragstart="startDrag($event, item)">
      {{ item.title }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tilesToShow: { type: Array },
  },
  methods: {
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
      //console.log("StartDrag", evt.dataTransfer.getData("itemID"));
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
  }
}
</style>
