<template>
  <div>
    <div class="drag-el_delete" @click="$emit('removeItem', item.uid)">Remove</div>
    <div class="drag-el_wrapper">
      <p>{{ item.titel }}</p>
      <div class="drag-el_input">
        <div v-for="(input, i) in item.hasInput" :key="i">
          <input
            :class="['drag-el_input_text', `drag-el_input_text_${input.style}`]"
            type="text"
            v-if="input.type === 'text'"
            @input="$emit('valueChange', $event.target.value, item.uid, i)"
          />
          <input
            class="drag-el_input_number"
            type="number"
            v-if="input.type === 'number'"
            max="999"
            step="1"
            :value="input.default"
            @input="$emit('valueChange', $event.target.value, item.uid, i)"
          />
        </div>
      </div>
    </div>
    <TileComponent v-if="item.allowChilds?.length > 0 && item.childs" :item="item.childs" @valueChange="changeChild" @removeItem="$emit('removeItem')" />
  </div>
</template>

<script>
export default {
  emits: ["valueChange", "removeItem", "changeChild"],
  props: {
    item: { type: Object },
    tilesToShow: { type: Array },
  },
  methods: {
    changeChild(value, uid, positionInArray) {
      this.$emit("changeChild", value, uid, positionInArray, this.item.uid);
    },
  },
};
</script>

<style lang="scss">
.drag-el {
  &_input {
    display: flex;
    overflow-x: auto;
    width: 100%;

    &_text {
      width: 200px;

      &_short {
        width: 50px;
      }

      &_long {
        width: 300px;
      }
    }

    &_number {
      width: 50px;
      max-width: 150px;
    }
  }
}
</style>
