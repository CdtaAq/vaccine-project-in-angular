import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { ReportService } from '../services/report.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements AfterViewInit, OnDestroy {
  private subs: Subscription[] = [];

  constructor(private reportSvc: ReportService) {}

  ngAfterViewInit(): void {
    this.loadDosesPerDay();
    this.loadPopulationCoverage();
    this.loadAgeGender();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  private loadDosesPerDay() {
    const s = this.reportSvc.dosesPerDay().subscribe((data: any[]) => {
      this.drawBarChart('#dosesChart', data);
    }, err => {
      console.error('dosesPerDay error', err);
    });
    this.subs.push(s);
  }

  private loadPopulationCoverage() {
    const s = this.reportSvc.populationCoverage().subscribe((data: any) => {
      this.drawDonutChart('#coverageChart', [
        { label: 'Vaccinated', value: data.vaccinated },
        { label: 'Remaining', value: data.total - data.vaccinated }
      ]);
    }, err => console.error(err));
    this.subs.push(s);
  }

  private loadAgeGender() {
    const s = this.reportSvc.ageGender().subscribe((data: any) => {
      // age: [{ageGroup, count}], gender: [{gender, count}]
      this.drawBarChart('#ageChart', data.age, { key: 'ageGroup', value: 'count' });
      this.drawPieChart('#genderChart', data.gender, { key: 'gender', value: 'count' });
    }, err => console.error(err));
    this.subs.push(s);
  }

  // Generic bar chart
  private drawBarChart(container: string, dataset: any[], opts?: { key?: string, value?: string }) {
    const key = opts?.key || 'date';
    const value = opts?.value || 'count';

    // remove existing svg
    d3.select(container).selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const width = 700 - margin.left - margin.right;
    const barHeight = 28;
    const height = Math.max(200, dataset.length * barHeight);

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(dataset, (d: any) => d[value]) || 1])
      .range([0, width]);

    const y = d3.scaleBand()
      .domain(dataset.map(d => d[key]))
      .range([0, height])
      .padding(0.1);

    svg.selectAll('.bar')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', (d: any) => y(d[key]) as number)
      .attr('width', (d: any) => x(d[value]))
      .attr('height', y.bandwidth())
      .attr('fill', '#3f51b5');

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(5));

    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y));
  }

  private drawPieChart(container: string, dataset: any[], opts?: { key?: string, value?: string }) {
    const key = opts?.key || 'label';
    const value = opts?.value || 'value';

    d3.select(container).selectAll('*').remove();

    const width = 360;
    const height = 360;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(container).append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width/2},${height/2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie<any>().value((d: any) => d[value]);
    const arc = d3.arc<any>().innerRadius(0).outerRadius(radius);

    const arcs = svg.selectAll('arc')
      .data(pie(dataset))
      .enter()
      .append('g');

    arcs.append('path')
      .attr('d', arc as any)
      .attr('fill', (d: any, i: number) => color(i.toString()) as string);

    arcs.append('text')
      .attr('transform', (d: any) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .text((d: any) => `${d.data[key]} (${d.data[value]})`)
      .style('font-size', '12px');
  }

  private drawDonutChart(container: string, dataset: any[]) {
    // reuse pie chart but innerRadius > 0
    d3.select(container).selectAll('*').remove();

    const width = 360;
    const height = 360;
    const radius = Math.min(width, height) / 2;
    const inner = radius * 0.5;

    const svg = d3.select(container).append('svg')
      .attr('width', width).attr('height', height)
      .append('g').attr('transform', `translate(${width/2},${height/2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const pie = d3.pie<any>().value((d: any) => d.value);
    const arc = d3.arc<any>().innerRadius(inner).outerRadius(radius);

    const arcs = svg.selectAll('arc')
      .data(pie(dataset))
      .enter()
      .append('g');

    arcs.append('path').attr('d', arc as any).attr('fill', (d,i)=>color(i.toString()) as string);
    arcs.append('text').attr('transform', (d:any)=>`translate(${arc.centroid(d)})`).attr('text-anchor','middle').text((d:any)=>`${d.data.label}: ${d.data.value}`);
  }
}
