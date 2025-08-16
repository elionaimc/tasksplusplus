import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-edit-dialog',
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
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent {
  readonly title = new FormControl('', [Validators.required]);
  readonly description = new FormControl('', [Validators.required]);
  descriptionErrorMessage = signal('');
  titleErrorMessage = signal('');
  finished = false;
  dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  data = inject(DIALOG_DATA);

  constructor(
    private readonly taskService: TaskService
  ) {
    this.title.setValue(this.data.title);
    this.description.setValue(this.data.description);
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
      this.description.hasError('required') ? this.descriptionErrorMessage.set('A descrição é obrigatória.') : this.descriptionErrorMessage.set('');
    }
  }

  edit() {
    this.taskService.edit({
      id: this.data.id,
      title: this.title.value!,
      description: this.description.value!,
      createdAt: this.data.created_at,
      updatedAt: new Date(),
      finished: this.finished
    }, this.data.idx).subscribe(async () => this.loadTasks());
    this.dialogRef.close();
  }

  loadTasks() {
    this.taskService.loadTasks();
  }
}