import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-widgets-brand',
  templateUrl: './widgets-brand.component.html',
  styleUrls: ['./widgets-brand.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsBrandComponent implements AfterContentInit {

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  @Input() withCharts?: boolean;
  // @ts-ignore
  chartOptions = {
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3
      }
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    }
  };
  labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  datasets = {
    borderWidth: 2,
    fill: true
  };
  colors = {
    backgroundColor: 'rgba(255,255,255,.1)',
    borderColor: 'rgba(255,255,255,.55)',
    pointHoverBackgroundColor: '#fff'
  };
  brandData = [
    {
      icon: 'cil-notes',
      values: [{ title: 'tribes', value: '50+' }],
      capBg: { '--cui-card-cap-bg': '#00b1cd' },
      labels: [...this.labels],
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [65, 59, 84, 84, 51, 55, 40], label: 'Facebook', ...this.colors }]
      }
    },
    {
      icon: 'cil-cursor',
      values: [{ title: 'squad', value: '30+' }],
      capBg: { '--cui-card-cap-bg': '#FA7F2C' },
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [65, 59, 84, 84, 51, 55, 40], label: 'Twitter', ...this.colors }]
      }
    },
    {
      icon: 'cil-code',
      values: [{ title: 'Applications', value: '200+' }],
      capBg: { '--cui-card-cap-bg': '#ffc212' },
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [78, 81, 80, 45, 34, 12, 40], label: 'LinkedIn', ...this.colors }]
      }
    },
    {
      icon: 'cil-pencil',
      values: [{ title: 'chapter area lead', value: '12+' }],
      capBg: { '--cui-card-cap-bg': '#2BDE5B' },
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [35, 23, 56, 22, 97, 23, 64], label: 'Events', ...this.colors }]
      }
    },
    {
      icon: 'cil-user',
      values: [{ title: 'chapter lead', value: '12+' }],      
      capBg: { '--cui-card-cap-bg': '#0015FF' },
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [35, 23, 56, 22, 97, 23, 64], label: 'Events', ...this.colors }]
      }
    },
    {
      icon: 'cil-people',
      values: [{ title: 'team members', value: '12+' }],
      color: 'info',
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [35, 23, 56, 22, 97, 23, 64], label: 'Events', ...this.colors }]
      }
    }
  ];

  capStyle(value: string) {
    return !!value ? { '--cui-card-cap-bg': value } : {};
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}
