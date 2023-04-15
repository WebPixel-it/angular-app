import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  TooltipComponentOption,
  GeoComponent,
  GeoComponentOption,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, GeoComponent, SVGRenderer]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | GeoComponentOption
>;

@Component({
  selector: 'seatmap',
  templateUrl: '../components/seatmap.component.html',
  styleUrls: ['../components/seatmap.component.css'],
})
export class SeatmapComponent implements OnInit {
  private chartDom!: HTMLElement | null;
  private myChart!: echarts.ECharts | null;
  private option!: EChartsOption | null;

  //pass data from child to parent component
  @Output() selectedNamesChange = new EventEmitter<string[]>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.chartDom = document.getElementById('seatmap');
    if (this.chartDom) {
      this.myChart = echarts.init(this.chartDom, undefined, {
        renderer: 'svg',
      });
      this.http
        .get('../assets/flight-seats.svg', {
          //SVG seat model import with Angular HTTP client
          responseType: 'text',
        })
        .subscribe((svg) => {
          echarts.registerMap('flight-seats', { svg });

          const takenSeatNames = [
            '26E',
            '26D',
            '26C',
            '25D',
            '23C',
            '21A',
            '20F',
          ];

          this.option = {
            tooltip: {},
            geo: {
              map: 'flight-seats',
              roam: true,
              selectedMode: 'multiple',
              layoutCenter: ['50%', '90%'],
              layoutSize: '170%', //size of seating map on card
              tooltip: {
                show: true,
              },
              itemStyle: {
                color: '#fff',
              },
              emphasis: {
                itemStyle: {
                  color: undefined,
                  borderColor: 'green',
                  borderWidth: 2,
                },
                label: {
                  show: false,
                },
              },
              select: {
                itemStyle: {
                  color: 'green',
                },
                label: {
                  show: false,
                  textBorderColor: '#fff',
                  textBorderWidth: 2,
                },
              },
              regions: this.makeTakenRegions(takenSeatNames),
            },
          };

          if (this.myChart && this.option) {
            this.myChart.setOption(this.option);
            // Get selected seats.
            this.myChart.on('geoselectchanged', (params: any) => {
              const selectedNames: string[] =
                params.allSelected[0].name.slice();

              // Remove taken seats.
              for (var i = selectedNames.length - 1; i >= 0; i--) {
                if (takenSeatNames.indexOf(selectedNames[i]) >= 0) {
                  selectedNames.splice(i, 1);
                }
              }

              console.log(selectedNames);

              //emit selectedNames variable and value to parent component
              this.selectedNamesChange.emit(selectedNames);
            });
          }
        });
    }
  }

  private makeTakenRegions(takenSeatNames: string[]) {
    var regions = [];
    for (var i = 0; i < takenSeatNames.length; i++) {
      regions.push({
        name: takenSeatNames[i],
        silent: true,
        itemStyle: {
          color: '#bf0e08',
        },
        emphasis: {
          itemStyle: {
            borderColor: '#aaa',
            borderWidth: 1,
          },
        },
        select: {
          itemStyle: {
            color: '#bf0e08',
          },
        },
      });
    }
    return regions;
  }
}
