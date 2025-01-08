import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {
  // Le constructeur ne nécessite plus le décorateur @Inject
  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    // Utilisez directement les données passées lors de l'ouverture du dialog
    public data: any // L'utilisateur à éditer
  ) {}

  saveUser(): void {
    // Vous pouvez sauvegarder ici et fermer le dialog après modification
    this.dialogRef.close(this.data);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
