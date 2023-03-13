import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { FormError } from '../../enums/form-error';
import { HttpStudentService } from '../../services/http-student.service';
import { StudentNavigatorService } from '../../services/student-navigator.service';

@Component({
  selector: 'app-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.css']
})
export class UpdatePasswordFormComponent implements OnInit, DoCheck, OnDestroy {

  studentId = "";
  password = "";
  confirmedPassword = "";
  errors = new Set<FormError>();

  private passwordUpdateSubscription$ = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private studentNavigatorService: StudentNavigatorService,
    private httpStudentService: HttpStudentService
  ) { }

  ngOnInit(): void {
    let idFromPath = this.route.snapshot.paramMap.get("id");
    this.studentId = idFromPath ? idFromPath : "";
  }

  ngDoCheck(): void {
    this.validateInput(FormError.BLANK_PASSWORD, () => this.password.length > 0);
    this.validateInput(FormError.DIFFERENT_PASSWORDS, () => this.password === this.confirmedPassword);
  }

  private validateInput(error: FormError, predicate: () => boolean): void {
    let isError = this.errors.has(error);
    if (predicate()) {
      if (isError) {
        this.errors.delete(error);
      }
    } else {
      if (!isError) {
        this.errors.add(error);
      }
    }
  }

  clear(): void {
    this.password = "";
    this.confirmedPassword = "";
  }

  confirm(): void {
    this.passwordUpdateSubscription$ = this.httpStudentService.updatePassword(this.studentId, this.password)
      .pipe(first())
      .subscribe({
        next: () => this.studentNavigatorService.toStudentPage(this.studentId),
        error: error => alert(error)
      });
  }

  close(): void {
    this.studentNavigatorService.toStudentPage(this.studentId);
  }

  ngOnDestroy(): void {
    this.passwordUpdateSubscription$.unsubscribe();
  }
}
