import { LocalStorage } from "quasar";
const filterPrefix = "_filter_";
export function setFilter(params: {
  filterName: string;
  obj: object;
}) {
  LocalStorage.set( filterPrefix + params.filterName, JSON.stringify(params.obj));
}

export function getFilter(params: {
   filterName: string
  }) {
  const obj = LocalStorage.getItem(filterPrefix + params.filterName);

  return (obj != null || obj != undefined )? JSON.parse( obj.toString()) : null ;;
}

export function removeFilter(params: {
  filterName: string
 }) {
  LocalStorage.remove(filterPrefix + params.filterName);
}

export function removeAllFilters() {
  const keys = LocalStorage.getAllKeys();
  keys.forEach(element => {
    if(element.startsWith(filterPrefix)){
      LocalStorage.remove(element);
    }
  });
}
