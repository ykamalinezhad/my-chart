import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexMarkers, ApexTitleSubtitle, ApexFill, ApexYAxis, ApexXAxis, ApexTooltip } from 'ng-apexcharts';

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.css']
})
export class MyChartComponent implements OnInit {
  public form: FormGroup;
  public series: ApexAxisChartSeries;
  public chart: ApexChart;
  public dataLabels: ApexDataLabels;
  public markers: ApexMarkers;
  public title: ApexTitleSubtitle;
  public fill: ApexFill;
  public yaxis: ApexYAxis;
  public xaxis: ApexXAxis;
  public tooltip: ApexTooltip;
  public timeWindowOptions: { id: number; value: string; }[];
  public symbolPairOptions: any;
  public chartData: any;
  public selectedSymbol: string;
  public isLoading: boolean;

  constructor(
    private fb: FormBuilder, 
    private httpClient : HttpClient
  ) { }

  ngOnInit(): void {
    this.getSymbolPairData()
    
    this.form = this.fb.group({
      timeWindow: [null],
      symbolPairs: [null]
    });

    this.reloadChartData(this.form.value)

    this.form.valueChanges.subscribe(data => {
      this.reloadChartData(data)
    })

    this.timeWindowOptions = [
      {
        id : 1,
        value: "Latest"
      },
      {
        id : 2,
        value: "Last Hour"
      },
      {
        id : 3,
        value: "Last Day"
      },
      {
        id : 3,
        value: "Last Month"
      },
      {
        id : 4,
        value: "Last Year"
      }
    ]
  }

  getSymbolPairData() {
    this.isLoading=true;
    try {
      this.httpClient.get('https://finnhub.io/api/v1/forex/symbol?exchange=oanda&token=cadjul2ad3i5theg2jdg').subscribe(res => this.symbolPairOptions=res)
    }
    catch(e) {
      console.log(e)

    } finally {
      this.isLoading=false;
    }
  }

  reloadChartData(data:any) {
    // the type of data should be same as what we gets from the endpoint (instead of any)
    // This endpoint is not working because it needs Authorization or API_Key. When I registered in the website, it asked me to pay money and subscribe API then they will give me API_Key
    // That's why I just explained what I should do for the getting data.
    // When I get data from this endpoint, I will pass it to the chart's dataset.

    // this.httpClient.get("https://web-services.oanda.com/rates/api/v2/rates/candle.json").subscribe(res => this.chartData = res)

    this.selectedSymbol = this.form.value?.symbolPairs?.displaySymbol ? this.form.value?.symbolPairs?.displaySymbol : "Select a symbol pair";

    this.series = [
      {
        data: this.chartData
      }
    ];
    this.chart = {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        show: false,
      }
    };
    this.dataLabels = {
      enabled: false
    };
    this.markers = {
      size: 0
    };
    this.title = {
      text: this.selectedSymbol,
      align: "center"
    };
    this.fill = {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    };
    this.yaxis = {
      title: {
        text: "price/ask/bid"
      },
      labels: {
        formatter: function(val) {
          return (val / 1000000).toFixed(0);
        }
      }
    };
    this.xaxis = {
      type: "datetime",
      title: {
        text: "Time"
      }
    };
    this.tooltip = {
      shared: false,
      y: {
        formatter: function(val) {
          return (val / 1000000).toFixed(0);
        }
      }
    };
  }
}
