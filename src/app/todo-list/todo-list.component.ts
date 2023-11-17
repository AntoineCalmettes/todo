import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @ViewChild('taskInput') taskInputRef!: ElementRef<HTMLInputElement>;

  tasks: Task[] = [];
  newTask: Task = { id: 0, title: '', description: '' };

  constructor(private taskService: TaskService) { }

  errorMessage: string = '';

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }
  addNewTask(): void {

    this.taskService.addTask(this.newTask).subscribe(() => {
      // Réinitialise la nouvelle tâche pour permettre l'ajout d'une autre tâche
      this.newTask = { id: 0, title: '', description: '' };
      // Mettre à jour la liste des tâches après l'ajout réussi
      this.taskService.getTasks().subscribe((tasks) => {
        this.tasks = tasks;
      });
    });


  }
  fetchTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      console.log(`Tâche avec l'ID ${id} supprimée avec succès.`);
      this.fetchTasks(); // Mettre à jour la liste après la suppression
    });
  }
}



// deleteTask(task: string): void {
//   this.tasks = this.tasks.filter(item => item !== task);
// }

