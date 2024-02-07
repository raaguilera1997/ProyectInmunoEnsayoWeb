export default class DefaultAdvanceFilterFormModel<T> {
    ignoredAssing: string[] = []; // example ["store"]
    Assign(obj: T){
        const k = Object.keys(this);
        k.forEach((s: string) => {
          if(!this.ignoredAssing.includes(s)){
            // @ts-ignore
            if(obj[s]){
              // @ts-ignore
              this[s].value = obj[s].value;
            }

          }
        });
      }
}
