import Vue from "vue";
import Vuex, { ActionTree } from "vuex";
import Operation from "../models/Operation";
import FieldService from "../FieldService";

Vue.use(Vuex);
const MockupApi = new FieldService();

export interface RootState {
  operationList: Array<Operation>;
}
const actions: ActionTree<RootState, RootState> = {
  async getOperationList({ commit }): Promise<void> {
    const response: Array<Operation> = await MockupApi.getOperations();
    commit("SET_FIELD_LIST", response);
  }
};
export default new Vuex.Store<RootState>({
  state: {
    operationList: []
  },
  mutations: {
    SET_FIELD_LIST(state: RootState, val: Array<Operation>) {
      state.operationList = val;
    }
  },
  actions
});
