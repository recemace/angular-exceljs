import { Component, OnInit } from '@angular/core'
import { ExportarService } from '../exportar.service'

import { Workbook } from 'exceljs'
import * as fs from 'file-saver'

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.component.html',
  styleUrls: ['./exportar.component.css']
})
export class ExportarComponent implements OnInit {

  constructor(
    public exportarService: ExportarService
  ) { }

  ngOnInit(): void {}

  async exportar(){

    let datos = await this.exportarService.listaracuerdos()
    let dataForExcel = [];
    datos.forEach((row: any) => {
      dataForExcel.push(Object.values(row))
    })

    let workbook = new Workbook()
    let worksheet = workbook.addWorksheet('datos')

    worksheet.mergeCells('A1', 'C1')
    let titleRow = worksheet.getCell('C1')
    titleRow.value = 'Acuerdos de consejo'
    titleRow.font = {
      name: 'Calibri',
      size: 16,
      underline: 'single',
      bold: true,
      color: { argb: '0085A3' }
    }

    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }

    dataForExcel.forEach(d => {

      // insertando filas
      let row = worksheet.addRow(d)
      let primercampo = row.getCell(1)
      primercampo.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF99FF99' }
      }
      worksheet.getColumn(4).width = 50

      // insertando campo con formula
      const nrow = row.number
      row.getCell(7).value = { formula: `A${nrow}`, date1904: false }

    })

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      fs.saveAs(blob, 'exportar.xlsx')
    })

  }

}