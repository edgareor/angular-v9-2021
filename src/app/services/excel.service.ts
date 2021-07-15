import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Workbook } from "exceljs";

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("personas");

    let rowsTable = [];

    for (let i = 0; i < json.length; i++) {
      let item = [
        json[i].id,
        json[i].nombre,
        json[i].apellido,
        json[i].rut
      ];
      rowsTable.push(item);
    }

    worksheet.addTable({
      name: "MyTableHeader",
      ref: "B2",
      headerRow: true,
      style: {
        theme: "TableStyleLight9",
        showRowStripes: true,
      },
      columns: [{ name: "DETALLE DE EXPORTACION" }, { name: " " }],
      rows: [
        ["Fecha Exportación", new Date().toISOString().slice(0, 10)],
      ],
    });

    worksheet.addTable({
      name: "MyTable",
      ref: "B5",
      headerRow: true,
      style: {
        theme: "TableStyleMedium2",
        showRowStripes: true,
      },
      columns: [
        { name: "ID Persona", filterButton: true },
        { name: "Nombre", filterButton: true },
        { name: "Apellido", filterButton: true },
        { name: "Rut", filterButton: true }
      ],
      rows: rowsTable,
    });

    const colB = worksheet.getColumn("B");
    colB.width = 25;
    colB.alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    const colC = worksheet.getColumn("C");
    colC.width = 25;
    colC.alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    const colD = worksheet.getColumn("D");
    colD.width = 25;
    colD.alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    const colE = worksheet.getColumn("E");
    colE.width = 25;
    colE.alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: EXCEL_TYPE });
      this.saveAsExcelFile(blob, excelFileName);
    });
  }

  private saveAsExcelFile(blob: any, fileName: string): void {
    FileSaver.saveAs(
      blob,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
