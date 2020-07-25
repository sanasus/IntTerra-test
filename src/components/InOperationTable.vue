<template>
  <table class="in-field-table">
    <thead class="in-field-table__head">
      <tr>
        <th class="in-field-table__th">
          <InArrowButton
            :is-active="
              getArrowData[getDateQuery[0]] || getArrowData[getDateQuery[1]]
            "
            :is-arrow-up="getArrowData[getDateQuery[1]]"
            @click="headClick(getDateQuery)"
            >Дата</InArrowButton
          >
        </th>
        <th class="in-field-table__th">
          <InArrowButton
            :is-active="
              getArrowData[getOperationQuery[0]] ||
                getArrowData[getOperationQuery[1]]
            "
            :is-arrow-up="getArrowData[getOperationQuery[1]]"
            @click="headClick(getOperationQuery)"
            >Операция</InArrowButton
          >
        </th>
        <th class="in-field-table__th">
          <InArrowButton
            :is-active="
              getArrowData[getCropQuery[0]] || getArrowData[getCropQuery[1]]
            "
            :is-arrow-up="getArrowData[getCropQuery[1]]"
            @click="headClick(getCropQuery)"
            >Культура</InArrowButton
          >
        </th>
        <th class="in-field-table__th">
          <InArrowButton
            :is-active="
              getArrowData[getAssessmentQuery[0]] ||
                getArrowData[getAssessmentQuery[1]]
            "
            :is-arrow-up="getArrowData[getAssessmentQuery[1]]"
            @click="headClick(getAssessmentQuery)"
            >Качество</InArrowButton
          >
        </th>
      </tr>
    </thead>
    <InOperationTableRow
      v-for="(operation, id) in operationList"
      :key="id"
      :operation="operation"
    />
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Operation from "@/models/Operation";
import { SortQuery, DescSortQuery } from "@/models/InRouterFieldQuery";
import InOperationTableRow from "@/components/InOperationTableRow.vue";
import InArrowButton from "@/components/InArrowButton.vue";

interface ArrowData {
  [query: string]: boolean;
}

@Component({
  name: "InOperationTable",
  components: {
    InOperationTableRow,
    InArrowButton
  }
})
export default class InOperationTable extends Vue {
  @Prop() readonly operationList: Operation[];
  @Prop() readonly sort: string;

  get getArrowData(): ArrowData {
    return {
      [SortQuery.DATE]: this.sort === SortQuery.DATE,
      [DescSortQuery.DATE]: this.sort === DescSortQuery.DATE,
      [SortQuery.OPERATION]: this.sort === SortQuery.OPERATION,
      [DescSortQuery.OPERATION]: this.sort === DescSortQuery.OPERATION,
      [SortQuery.CROP]: this.sort === SortQuery.CROP,
      [DescSortQuery.CROP]: this.sort === DescSortQuery.CROP,
      [SortQuery.ASSESSMENT]: this.sort === SortQuery.ASSESSMENT,
      [DescSortQuery.ASSESSMENT]: this.sort === DescSortQuery.ASSESSMENT
    };
  }

  get getDateQuery() {
    return [SortQuery.DATE, DescSortQuery.DATE];
  }

  get getOperationQuery() {
    return [SortQuery.OPERATION, DescSortQuery.OPERATION];
  }

  get getCropQuery() {
    return [SortQuery.CROP, DescSortQuery.CROP];
  }

  get getAssessmentQuery() {
    return [SortQuery.ASSESSMENT, DescSortQuery.ASSESSMENT];
  }

  headClick(query: [SortQuery, DescSortQuery]) {
    this.$emit("headClick", query);
  }
}
</script>

<style lang="scss" scoped>
.in-field-table {
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  background-color: transparent;
  text-align: left;
}

.in-field-table__head {
  background-color: var(--gray-3);
}

.in-field-table__th {
  padding: 0 10px;
}
</style>
