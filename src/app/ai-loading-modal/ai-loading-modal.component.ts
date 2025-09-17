import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface LoadingModalData {
  totalColumns: number;
}

@Component({
  selector: 'app-ai-loading-modal',
  standalone: false,
  templateUrl: './ai-loading-modal.component.html',
  styleUrl: './ai-loading-modal.component.scss',
})
export class AiLoadingModalComponent implements OnInit, OnDestroy {
  currentStep: number = -1;
  currentMessage: string = 'Preparing AI analysis...';
  analyzedColumns: number = 0;
  sensitiveFound: number = 0;
  showStats: boolean = false;
  showCancelButton: boolean = true;

  private stepMessages = [
    'Scanning database schema for table structures...',
    'Applying HIPAA, GDPR, and PCI compliance rules...',
    'Generating optimal obfuscation strategies...',
    'Applying AI recommendations to your tables...',
  ];

  constructor(
    public dialogRef: MatDialogRef<AiLoadingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoadingModalData
  ) {
    // Disable closing by clicking outside or pressing ESC
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.startLoadingSequence();
  }

  ngOnDestroy() {
    // Cleanup any timers if needed
  }

  private startLoadingSequence() {
    // Step 0: Analyzing Schema
    setTimeout(() => this.updateStep(0), 500);

    // Step 1: Identifying Sensitive Data
    setTimeout(() => this.updateStep(1), 1300);

    // Step 2: Generating Strategies
    setTimeout(() => {
      this.updateStep(2);
      this.showStats = true;
      this.animateCounter('analyzedColumns', this.data.totalColumns || 0);
    }, 2100);
  }

  updateStep(step: number) {
    this.currentStep = step;
    if (step < this.stepMessages.length) {
      this.currentMessage = this.stepMessages[step];
    }
  }

  updateToFinalStep(sensitiveCount: number) {
    this.updateStep(3);
    this.animateCounter('sensitiveFound', sensitiveCount);
    this.showCancelButton = false;
  }

  private animateCounter(
    property: 'analyzedColumns' | 'sensitiveFound',
    targetValue: number
  ) {
    let currentValue = 0;
    const increment = Math.max(1, Math.ceil(targetValue / 20));
    const interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(interval);
      }
      this[property] = currentValue;
    }, 50);
  }

  onCancel() {
    this.dialogRef.close('cancelled');
  }

  closeModal(result?: any) {
    this.dialogRef.close(result);
  }
}
