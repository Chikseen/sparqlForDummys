<template>
  <div class="drop-zone" @drop="onDrop($event, 2)" @dragover.prevent @dragenter.prevent>
    <TransitionGroup name="list" tag="ul">
      <div v-for="item in itemsToShow" :key="item.title" class="drag-el" draggable="true">
        <div class="drag-el_delete" @click="removeItem(item.uid)">Remove</div>
        <div class="drag-el_wrapper">
          <p>{{ item.title }}</p>
          <input type="text" v-if="item.hasText" @input="changeValue($event.target.value, item.uid)" />
          <input type="number" v-if="item.hasNumber" min="0" max="999" step="1" value="10" @input="changeValue($event.target.value, item.uid)" />
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
<script>
//import store from "@/store/index.js";

export default {
  props: {
    tilesToShow: { type: Array },
  },
  data() {
    return {
      itemsToShow: [],
    };
  },
  methods: {
    onDrop(evt) {
     // console.log("dropdrag", evt.dataTransfer.getData("itemID"));
      const itemID = evt.dataTransfer.getData("itemID");
      const item = this.tilesToShow.find((item) => item.id == itemID);
      // console.log("item", item);
      item.uid = Math.floor(Math.random() * 999999999);
      this.itemsToShow.push({ ...item });
      this.$store.commit("setCurrentItems", this.itemsToShow);
    },
    removeItem(uid) {
      // console.log("remove", uid);
      const i = this.itemsToShow.findIndex((item) => item.uid == uid);
      this.itemsToShow.splice(i, 1);
      this.$store.commit("setCurrentItems", this.itemsToShow);
    },
    changeValue(value, uid) {
      const i = this.itemsToShow.findIndex((item) => item.uid == uid);
      if (i >= 0) {
        this.itemsToShow[i].value = value;
        // console.log("change", this.itemsToShow[i]);
        this.$store.commit("setCurrentItems", [...this.itemsToShow]);
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
