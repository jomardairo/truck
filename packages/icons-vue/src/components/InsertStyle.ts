import { defineComponent } from 'vue';
import { useInsertStyles } from '../utils';

export let InsertStyles = defineComponent({
  name: 'InsertStyles',
  setup() {
    useInsertStyles();
    return () => {
      return null;
    };
  },
});
