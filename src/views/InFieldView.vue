<template>
  <div class="in-field">
    <h1 class="in-field__title">Операции на поле 112</h1>
    <div class="in-field__btn-panel">
      <div class="in-field__filter">
        <router-link
          v-for="(button, id) in filterButonsData"
          :key="id"
          class="in-field__filter-btn"
          :to="button.link"
          >{{ button.text }}</router-link
        >
      </div>
      <InButton class="in-field__add-btn">Добавить операцию</InButton>
    </div>
    <InFilterOperations
      :filter="validFilterQuery"
      :operation-list="operationList"
      v-slot="{ operations: filterOperation }"
    >
      <InSortOperations
        :sort="validSortQuery"
        :operation-list="filterOperation"
        v-slot="{ operations: sortOperation }"
      >
        <InOperationTable
          :operation-list="sortOperation"
          :sort="validSortQuery"
          @headClick="changeSortQuery"
        ></InOperationTable>
      </InSortOperations>
    </InFilterOperations>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapState } from "vuex";
import { Location } from "vue-router";
import Operation from "@/models/Operation";
import InButton from "@/components/InButton.vue";
import InOperationTable from "@/components/InOperationTable.vue";
import InFilterOperations from "@/components/InFilterOperations.vue";
import InSortOperations from "@/components/InSortOperations.vue";
import {
  SortQuery,
  DescSortQuery,
  FiltersQuery
} from "@/models/InRouterFieldQuery";

interface FIlterButton {
  text: string;
  link: Location;
}

@Component({
  name: "InFieldView",
  components: {
    InButton,
    InOperationTable,
    InFilterOperations,
    InSortOperations
  },
  computed: {
    ...mapState(["operationList"])
  },
  methods: {
    ...mapActions(["getOperationList"])
  }
})
export default class Home extends Vue {
  readonly operationList: Operation[];
  readonly getOperationList: () => void;
  readonly curentDate = new Date();
  async created() {
    await this.getOperationList();
  }

  get filterButonsData(): FIlterButton[] {
    return [
      {
        text: "Запланированные операции",
        link: {
          query: {
            ...this.$route.query,
            filter: FiltersQuery.PLANE
          }
        }
      },
      {
        text: "Выполненные операции",
        link: {
          query: {
            ...this.$route.query,
            filter: FiltersQuery.COMPLETE
          }
        }
      }
    ];
  }
  get validFilterQuery(): string {
    const filter = this.$route.query.filter;
    if (!filter || Array.isArray(filter)) return "";
    const isFilter = Object.keys(FiltersQuery).some(
      key => FiltersQuery[key] === filter
    );
    if (isFilter) return filter;
    return "";
  }
  get validSortQuery(): string {
    const sort = this.$route.query.sort;
    if (Array.isArray(sort)) return "";
    const isSort = Object.keys(SortQuery).some(key => SortQuery[key] === sort);
    const isDescSortQuery = Object.keys(DescSortQuery).some(
      key => DescSortQuery[key] === sort
    );
    if (isSort || isDescSortQuery) return sort;
    return "";
  }
  changeSortQuery([asc, desc]: [SortQuery, DescSortQuery]) {
    const routerQuery = this.$route.query;
    this.$router.push({
      query: {
        ...routerQuery,
        sort: routerQuery.sort === asc ? desc : asc
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.in-field {
  margin: 0 80px;
  padding: 23px 30px 30px;
  background-color: var(--white);
}

.in-field__title {
  margin: 0;
  font-weight: 500;
  font-size: 25px;
  line-height: 31px;
  letter-spacing: -0.8px;
}

.in-field__btn-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
}

.in-field__filter {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 18px;
}

.in-field__filter-btn {
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  letter-spacing: -0.517647px;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--main-text);
  transition: color 0.3s;

  &:hover,
  &.router-link-exact-active {
    color: var(--blue);
  }
}

.in-field__add-btn {
  align-self: start;
}
</style>
