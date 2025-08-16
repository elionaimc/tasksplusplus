import { Component, inject, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { setAppInjector } from './app.config';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from './shared/services/task.service';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CreateDialogComponent } from './shared/components/create-dialog/create-dialog.component';
import { Task } from './shared/dtos/task.dto';
import { EditDialogComponent } from './shared/components/edit-dialog/edit-dialog.component';
import { ConfirmDelete } from './shared/decorators/confirm-delete.decorator';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    DialogModule,
    MatSlideToggleModule,
    MatExpansionModule,
    CommonModule
  ],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  showPending = true;
  showFinished = true;
  isSmallScreen = false;
  states: boolean[] = [];
  dialog = inject(Dialog);
  
  constructor(
    private readonly injector: Injector,
    public readonly taskService: TaskService
  ) {
    inject(BreakpointObserver)
    .observe([ Breakpoints.XSmall, Breakpoints.Small ])
    .pipe(takeUntilDestroyed())
    .subscribe(result => {
      this.isSmallScreen = result.matches;
    });
    setAppInjector(this.injector);
    this.loadTasks();
  }

  changeState(idx: number, state: boolean) {
    this.states[idx] = state;
  }

  loadTasks() {
    this.taskService.loadTasks();
  }

  createTask(): void {
    this.dialog.open<string>(CreateDialogComponent, {
      minWidth: (this.isSmallScreen) ? '340px' : '790px',
      maxWidth: (this.isSmallScreen) ? '340px' : '790px',
      minHeight: '350px'
    });
  }

  editTask(task: Task, idx: number) {
    this.dialog.open<string>(EditDialogComponent, {
      minWidth: (this.isSmallScreen) ? '340px' : '790px',
      maxWidth: (this.isSmallScreen) ? '340px' : '790px',
      minHeight: '350px',
      data: { ...task, idx }
    });
  }

  @ConfirmDelete(
    'Quer mesmo excluir?',
    'Esta ação não poderá ser desfeita. Ao clicar em EXCLUIR, você confirma que deseja apagar todos os dados relacionados a esta tarefa.',
    [
      'delete_outline',
      'EXCLUIR'
    ]
  )
  deleteTask(idx: number): void {
    this.taskService.delete(idx).subscribe();
  }

  editStatusTask(idx: number, e: Event): void {
    e.stopPropagation();
    this.taskService.editStatus(idx);
  }

  filter(idx: number) {
    return this.taskService.tasksSignal()![idx].finished ? this.showFinished : this.showPending;
  }


}
