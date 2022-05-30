<template>
  <div class="drop-zone" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent @click="setSelection('')">
    <TransitionGroup name="list" tag="ul">
      <div
        v-for="item in itemsToShow"
        :key="item.uid"
        :class="['drag-el', item.allowChilds?.length > 0 ? 'drag-el_hasChilds' : '']"
        draggable="true"
        @drop="onDropChild($event, item)"
        @dragover.prevent
        @dragenter.prevent
        @click="setSelection(item.id)"
        style="z-index: 9999"
      >
        <Tile :item="item" :tilesToShow="tilesToShow" class="drag-el" @valueChange="changeValue" @removeItem="removeItem" @changeChild="changeChild" />
      </div>
    </TransitionGroup>
  </div>
</template>
<script>
import Tile from "@/components/TileComponent";

export default {
  components: {
    Tile,
  },
  props: {
    components: { type: Object },
  },
  computed: {
    tilesToShow() {
      let tiles = [];
      Object.keys(this.components).forEach((item) => {
        tiles.push(this.components[item]);
      });
      return tiles;
    },
  },
  data() {
    return {
      itemsToShow: [],
      blockComAdding: false,
    };
  },
  methods: {
    onDrop(evt) {
      if (!this.blockComAdding) {
        console.log("dropdrag", evt.dataTransfer.getData("itemID"));
        const itemID = evt.dataTransfer.getData("itemID");
        const item = this.tilesToShow.find((item) => item.id == itemID);
        item.uid = Math.floor(Math.random() * 999999999);
        this.itemsToShow.push({ ...item });
        this.$store.commit("setCurrentItems", this.itemsToShow);
      }
    },
    onDropChild(evt, origin) {
      const itemID = evt.dataTransfer.getData("itemID");
      const item = this.tilesToShow.find((item) => item.id == itemID);
      console.log("item", item);
      console.log("ori", origin);
      console.log("itemID", itemID);
      if (origin.allowChilds.some((cc) => cc === itemID)) {
        const i = this.itemsToShow.findIndex((item) => item.uid == origin.uid);
        item.uid = Math.floor(Math.random() * 999999999);
        console.log("i", i);
        this.itemsToShow[i].childs = item;

        this.$store.commit("setCurrentItems", this.itemsToShow);

        this.blockComAdding = true;
        setTimeout(() => {
          this.blockComAdding = false;
        }, 500);
      }
    },
    removeItem(uid) {
      // console.log("remove", uid);
      const i = this.itemsToShow.findIndex((item) => item.uid == uid);
      this.itemsToShow.splice(i, 1);
      this.$store.commit("setCurrentItems", this.itemsToShow);
    },
    changeValue(value, uid, positionInArray) {
      const i = this.itemsToShow.findIndex((item) => item.uid == uid);

      if (this.itemsToShow[i].hasUnlimtedInputs) {
        if (this.itemsToShow[i].hasInput[this.itemsToShow[i].hasInput.length - 1].value != "") {
          let newValue = { ...this.itemsToShow[i].hasInput[this.itemsToShow[i].hasInput.length - 1] };
          newValue.value = "";
          this.itemsToShow[i].hasInput.push(newValue);
        }
      }

      const item = this.itemsToShow[i];
      if (i >= 0) {
        item.hasInput[positionInArray].value = value;
        this.$store.commit("setCurrentItems", [...this.itemsToShow]);
      }
    },
    changeChild(value, uid, positionInArray, origin) {
      const i = this.itemsToShow.findIndex((item) => item.uid == origin);
      console.log("ijk", i);

      this.itemsToShow[i].childs.hasInput[positionInArray].value = value;

      console.log(this.itemsToShow[i].childs);
    },
    setSelection(item) {
      // a bit messesy but ok i think
      if (item != "") {
        setTimeout(() => {
          this.$store.commit("setSelectedElement", item);
        }, 75);
      } else {
        this.$store.commit("setSelectedElement", item);
      }
    },
  },
};
</script>

<style lang="scss">
.drop-zone {
  background-color: #eee;
  margin: 10px;
  padding: 10px;
}
.drag-el {
  position: relative;
  background-color: #fff;
  margin: 10px;
  padding: 5px;
  overflow: hidden;

  &_wrapper {
    display: flex;
    flex-direction: column;

    p {
      text-align: left;
      margin: 0;
    }

    input {
      margin-left: 25px;
    }
  }

  &_hasChilds {
    height: 150px;
  }

  &_delete {
    position: absolute;
    top: 0;
    right: 0;
    padding: 2px;
    font-size: 0.8rem;
    background-color: rgb(255, 77, 77);
    border-radius: 0 0 0 5px;
    transition: all 0.2s;
    transform: translateY(-100%);
  }

  &:hover .drag-el_delete {
    content: "";
    transform: translateY(0);
  }
}

// Transition
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
