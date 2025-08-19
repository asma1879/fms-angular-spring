import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.css']
})
export class DashboardChartComponent implements OnInit {

  roleChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Client', 'Freelancer', 'Admin'],
    datasets: [
      {
        data: [15, 25, 5],
        backgroundColor: ['#007bff', '#28a745', '#dc3545']
      }
    ]
  };
  roleChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'User Role Distribution' }
    }
  };

  // Job Status (Doughnut)
  jobStatusData: ChartData<'doughnut', number[], string | string[]> = {
    labels: ['Open', 'Closed', 'In Progress'],
    datasets: [
      {
        data: [40, 25, 15],
        backgroundColor: ['#ffc107', '#dc3545', '#17a2b8']
      }
    ]
  };
  jobStatusOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Job Status Overview' }
    }
  };

  // Earnings (Bar)
  earningsChartLabels: string[] = ['January', 'February', 'March', 'April'];
  earningsChartData: ChartData<'bar', number[], string | string[]> = {
    labels: this.earningsChartLabels,
    datasets: [
      {
        label: 'Total Earnings ($)',
        data: [1200, 1500, 1800, 2100],
        backgroundColor: '#20c997'
      }
    ]
  };
  earningsChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Monthly Earnings' }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor() {}

  ngOnInit(): void {}
}



