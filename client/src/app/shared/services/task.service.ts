import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from '../dtos/task.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasksSignal = signal<Task[] | null>([]);

  constructor(
    private readonly http: HttpClient
  ) { }

  async loadTasks() {
    this.http.get<Task[]>(`${environment.BACKEND_URL}/task`).pipe().subscribe((tasks): void => {
      console.log('uma task: ', tasks[2])
      this.tasksSignal.set(tasks);
    });
  }

  create(task: Task): Observable<Task> {
    this.tasksSignal()!.push(task);
    return this.http.post<Task>(`${environment.BACKEND_URL}/task`, task);
  }

  edit(task: Task, idx: number) {
    console.log('chamou edit', task)
    let tasks = this.tasksSignal()!;
    tasks[idx] = task;
    this.tasksSignal.set(tasks);
    return this.http.patch<Task>(`${environment.BACKEND_URL}/task/${tasks[idx]?.id}`, task);
  }

  delete(idx: number) {
    let tasks = this.tasksSignal()!;
    let _task = tasks[idx];
    this.tasksSignal()!.splice(idx, 1);
    return this.http.delete(`${environment.BACKEND_URL}/task/${_task.id}`);
  }

  editStatus(idx: number) {
    let edited = this.tasksSignal()!;
    edited[idx].finished = !edited[idx].finished;
    edited[idx].updatedAt = new Date();
    this.tasksSignal.set(edited);
  }
}