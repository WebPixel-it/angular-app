import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';

echarts.use([
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  SVGRenderer,
]);

@Component({
  selector: 'triplebarchart',
  templateUrl: './triplebarchart.component.html',
  styleUrls: ['./triplebarchart.component.css'],
})
export class TriplebarchartComponent implements AfterViewInit {
  @ViewChild('chart', { static: false })
  chartContainer: ElementRef | null = null;

  constructor() {}

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart(): void {
    if (this.chartContainer) {
      const chartDom = this.chartContainer.nativeElement;
      const myChart = echarts.init(chartDom, 'light', { renderer: 'svg' });

      const option = {
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ['product', '2015', '2016', '2017'],
          source: [
            { product: 'Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
            { product: 'Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
            { product: 'Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
            {
              product: 'Walnut Brownie',
              '2015': 72.4,
              '2016': 53.9,
              '2017': 39.1,
            },
          ],
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
      };

      myChart.setOption(option);
    }
  }
}
