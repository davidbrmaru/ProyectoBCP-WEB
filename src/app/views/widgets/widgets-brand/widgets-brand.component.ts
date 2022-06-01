import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { TribeService } from 'src/app/services/tribe.service';
import { SquadService } from 'src/app/services/squad.service';
import { ChapterAreaLeadService } from 'src/app/services/chapterarealead.service';
import { ChapterLeadService } from 'src/app/services/chapterlead.service';
import { TeamMemberService } from 'src/app/services/teammember.service';
@Component({
  selector: 'app-widgets-brand',
  templateUrl: './widgets-brand.component.html',
  styleUrls: ['./widgets-brand.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsBrandComponent implements AfterContentInit {

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private applicationService: ApplicationService,
    private tribeService: TribeService,
    private squadService: SquadService,
    private chapterAreaLeadService: ChapterAreaLeadService,
    private chapterLeadService : ChapterLeadService,
    private teamMemberService : TeamMemberService
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
  cargarTotales(){
    
    this.tribeService.getAllTribes().subscribe(res => this.brandData[0].values[0].value = res.length)
    this.squadService.getAllSquads().subscribe(res => this.brandData[1].values[0].value = res.length)
    this.applicationService.getAllApplications().subscribe(res => this.brandData[2].values[0].value = res.length)
    this.chapterAreaLeadService.getAllChapterAreaLeads().subscribe(res => this.brandData[3].values[0].value = res.length)
    this.chapterLeadService.getAllChapterLeads().subscribe(res => this.brandData[4].values[0].value = res.length)
    this.teamMemberService.getAllTeamMembers().subscribe(res => this.brandData[5].values[0].value = res.length)
  }

  brandData = [
    {
      icon: 'cil-notes',
      url: '/mantenimientos/tribe',
      values: [{ title: 'tribes', value: 0 }],
      capBg: { '--cui-card-cap-bg': '#00b1cd' },
      labels: [...this.labels],
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [65, 59, 84, 84, 51, 55, 40], label: 'Facebook', ...this.colors }]
      }
    },
    {
      icon: 'cil-cursor',
      values: [{ title: 'squads', value: 0 }],
      capBg: { '--cui-card-cap-bg': '#FA7F2C' },
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [65, 59, 84, 84, 51, 55, 40], label: 'Twitter', ...this.colors }]
      }
    },
    {
      icon: 'cil-code',
      values: [{ title: 'Applications', value: 0 }],
      capBg: { '--cui-card-cap-bg': '#ffc212' },
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [78, 81, 80, 45, 34, 12, 40], label: 'LinkedIn', ...this.colors }]
      }
    },
    {
      icon: 'cil-pencil',
      values: [{ title: 'chapter area lead', value: 0 }],
      capBg: { '--cui-card-cap-bg': '#2BDE5B' },
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [35, 23, 56, 22, 97, 23, 64], label: 'Events', ...this.colors }]
      }
    },
    {
      icon: 'cil-user',
      values: [{ title: 'chapter lead', value: 0 }],      
      capBg: { '--cui-card-cap-bg': '#0015FF' },
      data: {
        labels: [...this.labels],
        datasets: [{ ...this.datasets, data: [35, 23, 56, 22, 97, 23, 64], label: 'Events', ...this.colors }]
      }
    },
    {
      icon: 'cil-people',
      values: [{ title: 'team members', value: 0 }],
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

  ngOnInit(){

    this.cargarTotales();

  }
}
