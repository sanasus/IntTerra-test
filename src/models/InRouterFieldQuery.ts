export enum SortQuery {
  DATE = "date", // Дата
  OPERATION = "operation", // Операция
  CROP = "crop", // Культура
  ASSESSMENT = "assessment" // Качество
}

export enum DescSortQuery {
  DATE = "date_desc",
  OPERATION = "operation_desc",
  CROP = "crop_desc",
  ASSESSMENT = "assessment_desc"
}

export enum FiltersQuery {
  PLANE = "plane", // Запланировано
  COMPLETE = "complete" // Выполнено
}
