<template>
  <div>
    <div class="drag-el_delete" @click="$emit('removeItem', item.uid)">Remove</div>
    <div class="drag-el_wrapper">
      <p>{{ item.titel }}</p>
      <div class="drag-el_input">
        <div v-for="(input, i) in item.hasInput" :key="i">
          <input
            type="text"
            :class="['drag-el_input_text', `drag-el_input_text_${input.style}`]"
            v-if="input.type === 'text'"
            @input="$emit('valueChange', $event.target.value, item.uid, i)"
          />
          <input
            type="number"
            class="drag-el_input_number"
            v-if="input.type === 'number'"
            max="999"
            step="1"
            min="0"
            @input="$emit('valueChange', $event.target.value, item.uid, i)"
          />
          <input
            type="text"
            :class="['drag-el_input_text', `drag-el_input_text_${input.style}`]"
            :list="item.uid + 'atpos' + i"
            v-if="input.type === 'list'"
            @input="$emit('valueChange', $event.target.value, item.uid, i)"
          />
          <datalist v-if="input.type === 'list'" :id="item.uid + 'atpos' + i">
            <option v-for="(list, j) in input.datalist" :key="list + j" :value="list" />
          </datalist>
        </div>
      </div>
    </div>
    <TileComponent
      class="drag-el_child"
      v-if="item.allowChilds?.length > 0 && item.childs"
      :item="item.childs"
      @valueChange="changeChild"
      @removeItem="$emit('removeItem')"
    />
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

  &_child {
    margin: 5px 0 0 25px;
    padding: 5px;
    border: solid 0.5px;
    border-radius: 5px;
    border-color: #b0b0b0
  }
}
</style>
