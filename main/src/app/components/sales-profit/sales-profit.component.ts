import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { Chart } from 'chart.js'; 
import {
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexLegend,
    ApexStroke,
    ApexTooltip,
    ApexAxisChartSeries,
    ApexPlotOptions,
    NgApexchartsModule,
    ApexFill,
    ApexGrid,
    ApexXAxis,
    ApexYAxis,
} from 'ng-apexcharts';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TransactionService } from 'src/app/pages/ui-components/forms/Transactionservice/transaction.service';
import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,  
  BarElement,     // Register BarElement
  Title,
  Tooltip,
  Legend
);


export interface salesprofitChart {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    fill: ApexFill;
    grid: ApexGrid;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
}


interface month {
    value: string;
    viewValue: string;
}
interface Transaction {
    id: number;
    type: string;
    date: string | null;
    amount: number;
    status: string;
  }
  


@Component({
    selector: 'app-sales-profit',
    standalone: true,
    imports: [MaterialModule, TablerIconsModule, NgApexchartsModule, MatButtonModule, CommonModule],
    templateUrl: './sales-profit.component.html',
})
export class AppSalesProfitComponent {
    @ViewChild('chart') chart: ChartComponent = Object.create(null);
    public salesprofitChart!: Partial<salesprofitChart> | any;

    months: month[] = [
        { value: 'mar', viewValue: 'Sep 2024' },
        { value: 'apr', viewValue: 'Oct 2024' },
        { value: 'june', viewValue: 'Nov 2024' },
    ];
    chartData: { labels: string[]; datasets: { label: string; data: any[]; backgroundColor: string; borderColor: string; borderWidth: number; }[]; };

    constructor(private transactionService:TransactionService) {
        this.salesprofitChart = {

            series: [
                {
                    type: "area",
                    name: "This Year",
                    chart: {
                        foreColor: "#111c2d99",
                        fontSize: 12,
                        fontWeight: 500,
                        dropShadow: {
                            enabled: true,
                            enabledOnSeries: undefined,
                            top: 5,
                            left: 0,
                            blur: 3,
                            color: "#000",
                            opacity: 0.1,
                        },
                    },
                    data: [
                        {
                            x: "Aug",
                            y: 25,
                        },
                        {
                            x: "Sep",
                            y: 25,
                        },
                        {
                            x: "Oct",
                            y: 10,
                        },
                        {
                            x: "Nov",
                            y: 10,
                        },
                        {
                            x: "Dec",
                            y: 45,
                        },
                        {
                            x: "Jan",
                            y: 45,
                        },
                        {
                            x: "Feb",
                            y: 75,
                        },
                        {
                            x: "Mar",
                            y: 70,
                        },
                        {
                            x: "Apr",
                            y: 35,
                        },
                    ],
                },
                {
                    type: "line",
                    name: "Last Year",
                    chart: {
                        foreColor: "#111c2d99",
                    },
                    data: [
                        {
                            x: "Aug",
                            y: 50,
                        },
                        {
                            x: "Sep",
                            y: 50,
                        },
                        {
                            x: "Oct",
                            y: 25,
                        },
                        {
                            x: "Nov",
                            y: 20,
                        },
                        {
                            x: "Dec",
                            y: 20,
                        },
                        {
                            x: "Jan",
                            y: 20,
                        },
                        {
                            x: "Feb",
                            y: 35,
                        },
                        {
                            x: "Mar",
                            y: 35,
                        },
                        {
                            x: "Apr",
                            y: 60,
                        },
                    ],
                },
            ],
            chart: {
                height: 320,
                type: 'area',
                fontFamily: "inherit",
                foreColor: "#adb0bb",
                fontSize: "12px",
                offsetX: -15,
                offsetY: 10,
                animations: {
                    speed: 500,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ["#00A1FF", "#8965E5"],
            dataLabels: {
                enabled: false,
            },
            fill: {
                colors: undefined,
                opacity: 0.1,
                type: 'solid',
            },
            grid: {
                show: true,
                strokeDashArray: 3,
                borderColor: "#90A4AE50",
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                tickAmount: 3,
            },
            legend: {
                show: false,
            },
            tooltip: {
                theme: "dark",
            },
        };
    }
    ngOnInit(){
        this.loadTransactions()
         
    }

    loadTransactions() {
        this.transactionService.getAllTransactions().subscribe({
          next: (data) => {
            if (data && Array.isArray(data) && data.length > 0) {
              // Grouping amounts by date
              const groupedData = this.groupByDate(data);
      
              // Prepare labels (dates) and dataset (sum of amounts)
              const labels = Object.keys(groupedData);
              const amounts = labels.map(date => groupedData[date]);
      
              // Prepare data for the chart
              this.chartData = {
                labels: labels,
                datasets: [{
                  label: 'Transaction Amounts Over Time',
                  data: amounts,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
                }]
              };
      
              // Call the chart method after data is prepared
              this.createChart();
            } else {
              console.log('No transactions found or invalid data');
            }
          },
          error: (error) => {
            console.error('Error fetching transactions:', error);
          }
        });
      }
      
      groupByDate(data: Transaction[]) {
        return data.reduce((acc: { [key: string]: number }, transaction: Transaction) => {
          const date = transaction.date ? transaction.date : 'Unknown'; // Handle missing dates
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += transaction.amount;
          return acc;
        }, {});
      }
      
      createChart() {
        const canvas = document.getElementById('myChart') as HTMLCanvasElement;
        const ctx = canvas?.getContext('2d');
        
        if (ctx) {
          new ChartJS(ctx, {
            type: 'bar',
            data: this.chartData,
            options: {
              responsive: true,
              scales: {
                x: {
                  type: 'category',  // Use the correct scale type
                  title: {
                    display: true,
                    text: 'Date'
                  }
                },
                y: {
                  type: 'linear',  // Use the correct scale type
                  title: {
                    display: true,
                    text: 'Amount'
                  }
                }
              }
            }
          });
        } else {
          console.error('Chart element not found');
        }
      }
      
      
      
      
      
}
