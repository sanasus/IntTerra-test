<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Operation from "@/models/Operation";
import { FiltersQuery } from "@/models/InRouterFieldQuery";

interface DataFilter {
  [query: string]: () => Operation[];
}

@Component({
  name: "InFilterOperations"
})
export default class InFilterOperations extends Vue {
  @Prop() readonly operationList: Operation[];
  @Prop() readonly filter: string | null;

  render() {
    return this.$scopedSlots.default({ operations: this.getFilterOperations });
  }

  get getFilterOperations(): Operation[] {
    const dataFilter: DataFilter = {
      [FiltersQuery.COMPLETE]: () => this.filterCompleteOperations,
      [FiltersQuery.PLANE]: () => this.filterPlapeOperations
    };
    if (!this.filter) return this.operationList;
    return dataFilter[this.filter]();
  }
  get filterCompleteOperations(): Operation[] {
    return this.operationList.filter(item => item.assessment !== null);
  }
  get filterPlapeOperations(): Operation[] {
    return this.operationList.filter(item => item.assessment === null);
  }
}
</script>
