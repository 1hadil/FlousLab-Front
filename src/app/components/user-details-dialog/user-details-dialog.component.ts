import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details-dialog',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">User Details</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-12 mb-2">
          <strong>Name:</strong> {{ data.name }}
        </div>
        <div class="col-12 mb-2">
          <strong>Email:</strong> {{ data.email }}
        </div>
        <div class="col-12 mb-2">
          <strong>Username:</strong> {{ data.username }}
        </div>
        <div class="col-12 mb-2">
          <strong>Job:</strong> {{ data.job }}
        </div>
        <div class="col-12 mb-2">
          <strong>Age:</strong> {{ data.age }}
        </div>
        <div class="col-12 mb-2">
          <strong>Salary:</strong> {{ data.salary || 'Not provided' }}
        </div>
        <div class="col-12 mb-2">
          <strong>Created Date:</strong> {{ data.createdDate }}
        </div>
        <div class="col-12 mb-2">
          <strong>Account Status:</strong> {{ data.enabled ? 'Active' : 'Inactive' }}
        </div>
        <div class="col-12 mb-2">
          <strong>Locked:</strong> {{ data.accountLocked ? 'Yes' : 'No' }}
        </div>
      </div>
    </div>
 
  `,
  styleUrls: ['./user-details-dialog.component.scss']
})
export class UserDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
