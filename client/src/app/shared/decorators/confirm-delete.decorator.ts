import { MatDialog } from '@angular/material/dialog';
import { filter, tap } from 'rxjs/operators';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { AppInjector } from '../../app.config';

export function ConfirmDelete(label: string, message: string, button: string[]) {
  return (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ) => {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      AppInjector.get(MatDialog)?.open(DeleteDialogComponent, {
        panelClass: 'rounded-dialog',
        minWidth: '350px',
        data: { label, message, button },
      })
        .afterClosed()
        .pipe(
          filter(confirm => !!confirm),
          tap(() => method.apply(this, args)),
        )
        .subscribe();
    };
  };
}