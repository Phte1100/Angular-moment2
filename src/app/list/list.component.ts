import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Service1Service } from '../services/service1.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'] 
})
export class ListComponent {
  courses: any[] = [];
  filteredCourses: any[] = [];
  currentSort: { column: string, ascending: boolean } = { column: '', ascending: true };
  filteredValue: string = "";

  constructor(private service1Service: Service1Service) {}

  ngOnInit() {
      this.service1Service.getCourses().subscribe((data) => {
      this.courses = data;
      this.filteredCourses = data;
    }); 
  }

  applyFilter(): void { // filtrera efter namn och kurskod
    this.filteredCourses = this.courses.filter(course =>
      course.coursename.toLowerCase().includes(this.filteredValue.toLowerCase()) ||
      course.code.toLowerCase().includes(this.filteredValue.toLowerCase())
    );
  }
  sortCourses(column: string): void {
    if (this.currentSort.column === column) {
      this.currentSort.ascending = !this.currentSort.ascending;
    } else {
      this.currentSort = { column: column, ascending: true };
    }
    
    this.filteredCourses.sort((a, b) => {
      if (a[column] < b[column]) return this.currentSort.ascending ? -1 : 1;
      if (a[column] > b[column]) return this.currentSort.ascending ? 1 : -1;
      return 0;
    });
  }
}
