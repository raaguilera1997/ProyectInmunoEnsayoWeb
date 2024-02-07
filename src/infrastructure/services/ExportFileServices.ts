import { exportFile } from "quasar";

// @ts-ignore
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

function TableToCSV(columns: {}[], data: {}[], name: string) {
  //console.log(columns)
  //console.log(data)

  // @ts-ignore
  const content = [columns.map(col => wrapCsvValue(col.label))]
    .concat(
      data.map(row =>
        columns
          .map(col =>
            wrapCsvValue(
              // @ts-ignore
              typeof col.field === "function"
                ? // @ts-ignore
                  col.field(row)
                : // @ts-ignore
                  row[col.field === void 0 ? col.name : col.field],
              // @ts-ignore
              col.format
            )
          )
          .join(",")
      )
    )
    .join("\r\n");

  const status = exportFile(`${name}.csv`, content, "text/csv");
}

export { TableToCSV };
