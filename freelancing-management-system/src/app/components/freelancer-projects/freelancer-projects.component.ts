import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-freelancer-projects',
  templateUrl: './freelancer-projects.component.html',
  styleUrls: ['./freelancer-projects.component.css']
})
export class FreelancerProjectsComponent implements OnInit {
   projects: any[] = [];
  editingProject: any = null;
  skillsInput: string = '';

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

//   startEdit(project: any): void {
//     this.editingProject = { ...project };
//   }
startEdit(project: any): void {
  this.editingProject = { ...project };
  this.skillsInput = project.skills?.join(', ') || '';
}

  cancelEdit(): void {
    this.editingProject = null;
  }

  saveEdit(): void {
    this.projectService.updateProject(this.editingProject.id, this.editingProject).subscribe(() => {
      this.loadProjects();
      this.editingProject = null;
    });
  }
  parseSkills(): void {
  if (this.editingProject) {
    this.editingProject.skills = this.skillsInput
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
  }
}


  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe(() => {
        this.loadProjects();
      });
    }
  }
}


