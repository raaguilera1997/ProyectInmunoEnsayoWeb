export interface IDefaultInput {
  label: string,
  maxLength?: number,
  value: string,
  rules?: any,
  icon?: any,

}
export interface IDefaultBooleanInput {
  label: string,
  value: boolean,
  rules?: any,
}
export  interface IDefaultMultiSelectInput {
  label: string,
  value: number[],
  rules?: any,
}

export  interface IDefaultNumberInput {
  label: string,
  maxLength?: number,
  value: any,
  rules?: any,
  mask?:string,
  icon?:string
}

export  interface IDefaultSelectInput {
  label: string,
  value: number,
}

export  interface IPasswordInput extends IDefaultInput {
  show: boolean
}
export  interface IColumns {
  name: string;
  label: string;
  align?: string;
  field: string | Function;
  required?: boolean;
  format?: Function;
  sortable?: boolean;
}

export  interface IPagination {
  sortBy: string,
  descending: boolean,
  page: number,
  rowsPerPage: number,
}
