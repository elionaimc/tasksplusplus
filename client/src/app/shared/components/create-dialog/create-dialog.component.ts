import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogRef } from '@angular/cdk/dialog';
import { merge } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-create-dialog',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.scss'
})
export class CreateDialogComponent {
  readonly title = new FormControl('', [Validators.required]);
  readonly description = new FormControl('', [Validators.required]);
  descriptionErrorMessage = signal('');
  titleErrorMessage = signal('');
  dialogRef = inject(DialogRef);
  finished = false;

  constructor(
    private readonly taskService: TaskService
  ) {
    merge(this.title.statusChanges, this.title.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage('title'));
    merge(this.description.statusChanges, this.description.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage('description'));
  }

  updateErrorMessage(value: string) {
    if (value === 'title') {
      if (this.title.hasError('required')) {
        this.titleErrorMessage.set('O título é obrigatório.');
      } else {
        this.titleErrorMessage.set('');
      }
    } else {
      if (this.description.hasError('required')) {
        this.descriptionErrorMessage.set('A descrição é obrigatória.');
      } else {
        this.descriptionErrorMessage.set('');
      }
    }
  }

  create() {
    this.taskService.create({
      title: this.title.value!,
      description: this.description.value!,
      createdAt: new Date(),
      updatedAt: new Date(),
      finished: this.finished
    }).subscribe(() => this.taskService.loadTasks());
    this.dialogRef.close();
  }
}