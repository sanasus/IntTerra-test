<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Operation from "@/models/Operation";
import { SortQuery, DescSortQuery } from "@/models/InRouterFieldQuery";

interface DataSort {
  [query: string]: () => Operation[];
}

@Component({
  name: "InSortOperations"
})
export default class InSortOperations extends Vue {
  @Prop() readonly operationList: Operation[];
  @Prop() readonly sort: string | null;

  render() {
    return this.$scopedSlots.default({ operations: this.getOperations });
  }

  get getOperations(): Operation[] {
    const dataSort: DataSort = {
      [SortQuery.DATE]: () =>
        this.operationList.sort((a, b) => this.sortByDate(a, b)),
      [DescSortQuery.DATE]: () =>
        this.operationList.sort((a, b) => this.sortByDate(b, a)),
      [SortQuery.OPERATION]: () =>
        this.operationList.sort((a, b) => this.sortByOperation(a, b)),
      [DescSortQuery.OPERATION]: () =>
        this.operationList.sort((a, b) => this.sortByOperation(b, a)),
      [SortQuery.CROP]: () => this.operationList,
      [DescSortQuery.CROP]: () => this.operationList,
      [SortQuery.ASSESSMENT]: () =>
        this.operationList.sort((a, b) => this.sortByAssessment(a, b)),
      [DescSortQuery.ASSESSMENT]: () =>
        this.operationList.sort((a, b) => this.sortByAssessment(b, a))
    };
    if (this.sort) return [...dataSort[this.sort]()];
    return this.operationList;
  }
  sortByDate(a, b) {
    const aDate = new Date(a.date.year, a.date.month, a.date.day).getTime();
    const bDate = new Date(b.date.year, b.date.month, b.date.day).getTime();
    if (aDate > bDate) return 1;
    if (aDate < bDate) return -1;
    return 0;
  }
  sortByOperation(a, b) {
    if (a.type > b.type) return 1;
    if (a.type < b.type) return -1;
    return 0;
  }
  sortByAssessment(a, b) {
    if (a.assessment > b.assessment) return 1;
    if (a.assessment < b.assessment) return -1;
    return 0;
  }
}
</script>
