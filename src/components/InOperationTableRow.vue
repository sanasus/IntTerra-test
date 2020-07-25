<template>
  <tr class="in-row">
    <td class="in-row__cell">
      <span class="in-row__date">
        {{ dateText }}
      </span>
    </td>
    <td class="in-row__cell in-row__cell-operation">
      <span class="in-row__operation"> {{ operationText }}</span>
    </td>
    <td class="in-row__cell in-row__cell-crop">
      <span class="in-row__crop">
        <img
          class="in-row__crop-icon"
          src="@/assets/CropWheat.svg"
          :alt="cropText"
        />
        {{ cropText }}
      </span>
    </td>
    <td class="in-row__cell">
      <span
        class="in-row__assessment"
        :class="[`in-row__assessment--${assessmentData.colorClass}`]"
      >
        {{ assessmentData.text }}
      </span>
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Operation, { OperationType, Assessment } from "@/models/Operation";
import localeRu from "@/locales/intterra-ru-RU.json";

@Component({
  name: "InOperationTableRow"
})
export default class InOperationTableRow extends Vue {
  @Prop() readonly operation: Operation;
  readonly localeRu = localeRu;
  readonly monthNames = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек"
  ];

  get dateText() {
    return `${this.operation.date.day} ${
      this.monthNames[this.operation.date.month]
    } ${this.operation.date.year}`;
  }

  get operationText() {
    return localeRu[OperationType[this.operation.type]] || "";
  }

  get cropText() {
    return "Пшеница озимая";
  }

  get assessmentData() {
    if (this.operation.assessment !== null) {
      const key = Assessment[this.operation.assessment];
      return {
        text: localeRu[key],
        colorClass: key.toLowerCase()
      };
    }
    return {
      text: "Нет оценки",
      colorClass: "default"
    };
  }
}
</script>

<style lang="scss" scoped>
.in-row__cell {
  height: 50px;
  padding: 10px 10px 0;
  border-bottom: 1px solid var(--gray-3);
  vertical-align: top;
}

.in-row__cell-operation {
  width: 70%;
}

.in-row__cell-crop {
  width: 30%;
}

.in-row__date {
  padding-top: 6px;
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  letter-spacing: -0.4px;
  text-transform: uppercase;
  white-space: nowrap;
  opacity: 0.8;
}

.in-row__operation {
  padding-top: 5px;
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  letter-spacing: -0.5px;
  white-space: nowrap;
}

.in-row__crop {
  display: flex;
  align-items: center;
  font-weight: normal;
  font-size: 11px;
  line-height: 13px;
  letter-spacing: -0.3px;
  white-space: nowrap;
}

.in-row__crop-icon {
  margin-right: 10px;
}

.in-field-table__assessment {
  vertical-align: top;
}

.in-row__assessment {
  display: flex;
  align-items: center;
  padding-top: 3px;
  font-weight: normal;
  font-size: 11px;
  line-height: 19px;
  letter-spacing: -0.3px;
  white-space: nowrap;

  &::before {
    content: "";
    width: 20px;
    height: 10px;
    margin-right: 10px;
    border-radius: 5px;
  }

  &--default::before {
    background: var(--gray-3);
  }

  &--default::before {
    background: var(--gray-3);
  }

  &--excellent::before {
    background: var(--green);
  }

  &--satisfactorily::before {
    background: var(--yellow);
  }

  &--badly::before {
    background: var(--red);
  }
}
</style>
