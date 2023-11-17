import { Component, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @ViewChild('taskInput') taskInputRef!: ElementRef<HTMLInputElement>;
  tasks: string[] = ["Sortir le chien"];

  errorMessage: string = '';

  addTask(task: string, event: Event): void {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire
    if (task.trim() && !this.tasks.includes(task)) {
      this.tasks.push(task); // Ajoute la tâche à la liste
      this.taskInputRef.nativeElement.value = '';
    } else {
      this.errorMessage = "La tâche existe déjà dans la liste !";
    }
  }

  deleteTask(task: string): void {
    this.tasks = this.tasks.filter(item => item !== task);
  }


}
