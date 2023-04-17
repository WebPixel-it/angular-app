import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  DatasetComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
echarts.use([
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  SVGRenderer,
]);
type EChartsOption = echarts.ComposeOption<
  | DatasetComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | BarSeriesOption
>;

@Component({
  selector: 'triplebarchart',
  templateUrl: './triplebarchart.component.html',
  styleUrls: ['./triplebarchart.component.css'],
})
export class TriplebarchartComponent implements OnInit {
  @ViewChild('chart', { static: true }) private chartRef!: ElementRef;

  private myChart!: echarts.ECharts;
  private option!: EChartsOption;

  ngOnInit() {
    const chartElement = this.chartRef.nativeElement;
    this.myChart = echarts.init(chartElement);
    this.option = {
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
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
    };

    this.option && this.myChart.setOption(this.option);
  }
}
