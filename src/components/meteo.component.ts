import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GaugeChart, CanvasRenderer]);

@Component({
  selector: 'meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css'],
})
export class MeteoComponent implements OnInit {
  currentValue: number;
  currentCity: string;
  @ViewChild('meteo', { static: true }) meteoRef!: ElementRef;

  private chart: any;

  constructor() {
    this.chart = null;
    this.currentValue = 36;
    this.currentCity = '';
  }

  ngOnInit(): void {
    const chartElement = this.meteoRef.nativeElement;
    const myChart = echarts.init(chartElement);

    let currentCity = '';
    let currentValue = 36;
    const updateChart = (value: number, city: string) => {
      this.currentValue = value;
      this.currentCity = city;
    };

    const values = [25, 36];
    const cities = ['Milano', 'Athens'];
    let counter = 0;
    let count = 0;

    const option = {
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 50,
          splitNumber: 10,
          itemStyle: {
            color: '#b30d0d',
            shadowColor: 'rgba(0,138,255,0.45)',
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
          progress: {
            show: true,
            width: 30,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 30,
            },
          },
          axisTick: {
            distance: -45,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          splitLine: {
            distance: -52,
            length: 14,
            lineStyle: {
              width: 3,
              color: '#999',
            },
          },
          axisLabel: {
            distance: -10,
            color: '#999',
            fontSize: 14,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            width: '80%',
            lineHeight: 30,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 25,
            fontWeight: 'bolder',
            formatter: () => {
              return this.currentValue + `°C` + '\n' + this.currentCity;
            },
            color: 'inherit',
          },
          data: [
            {
              value: 36,
            },
          ],
        },
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 50,

          itemStyle: {
            color: '#5f1010',
            shadowColor: 'rgba(95,16,16,0.75)',
            shadowBlur: 5,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
          progress: {
            show: true,
            width: 8,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          detail: {
            show: false,
          },
          data: [
            {
              value: 36,
            },
          ],
        },
      ],
    };

    setInterval(function () {
      const value = values[counter];
      counter = (counter + 1) % values.length;

      const city = cities[count];
      count = (count + 1) % cities.length;
      updateChart(value, city);

      myChart.setOption({
        series: [
          {
            data: [
              {
                value: value,
              },
            ],
          },
          {
            data: [
              {
                value: value,
              },
            ],
          },
        ],
      });
    }, 3000);
    myChart.setOption(option);
  }
}
