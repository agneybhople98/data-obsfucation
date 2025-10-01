import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-streaming-loading',
  standalone: false,
  templateUrl: './streaming-loading.component.html',
  styleUrl: './streaming-loading.component.scss',
})
export class StreamingLoadingComponent {
  currentStep = 1;
  totalSteps = 3;
  currentStepText = 'Scanning schemas...';
  progressPercentage = 0;
  isComplete = false;
  hasError = false;
  errorMessage = '';
  scannedTables = new Set<string>(); // Track unique tables
  tablesScannedCount = 0;
  currentEntity = 'Person'; // Since all your tables are under Person entity

  // Real-time streaming data
  currentTable = '';
  currentColumn = '';
  processedColumns = 0;
  totalColumns = 0;
  sensitiveColumnsCount = 0;
  actualTotalColumns: any;
  recentRecommendations: any[] = [];

  private subscription?: Subscription;

  constructor(
    public dialogRef: MatDialogRef<StreamingLoadingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StreamingLoadingComponent
  ) {
    this.totalColumns = data.totalColumns;
    this.actualTotalColumns = data.totalColumns;
  }

  ngOnInit(): void {
    // The subscription will be set up by the parent component
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Method to be called by the parent component to update progress
  // Update the updateProgress method:
  updateProgress(progress: any): void {
    this.currentTable = progress.currentTable || '';
    this.currentColumn = progress.currentColumn || '';
    this.processedColumns = progress.processedColumns || 0;
    this.totalColumns = progress.totalColumns || this.totalColumns;
    this.recentRecommendations = progress.recommendations || [];

    if (this.currentTable) {
      this.currentEntity = 'Person';
    }

    // Track unique tables scanned
    if (this.currentTable) {
      this.scannedTables.add(this.currentTable);
      this.tablesScannedCount = this.scannedTables.size;
    }

    // Calculate progress percentage
    if (this.totalColumns > 0) {
      this.progressPercentage = Math.round(
        (this.processedColumns / this.totalColumns) * 100
      );
    }

    // Update step text based on progress
    if (this.processedColumns === 0) {
      this.currentStepText = 'Processing columns...';
      this.currentStep = 1;
    } else if (this.processedColumns < this.totalColumns) {
      this.currentStepText = 'Evaluating masking options...';
      this.currentStep = 2;
    } else {
      this.currentStepText = 'Finalizing recommendations...';
      this.currentStep = 3;
    }

    // Handle completion
    if (progress.isComplete) {
      this.isComplete = true;
      this.progressPercentage = 100;
      this.sensitiveColumnsCount = this.recentRecommendations.filter(
        (r) => r.is_sensitive
      ).length;

      if (progress.error) {
        this.hasError = true;
        this.errorMessage = progress.error;
      }
    }
  }
  cancelAnalysis(): void {
    this.dialogRef.close('cancelled');
    window.location.reload();
  }

  applyRecommendations(): void {
    this.dialogRef.close({
      action: 'apply',
      recommendations: this.recentRecommendations,
    });
  }

  doNotApply(): void {
    window.location.reload();
  }

  closeModal(result: string): void {
    this.dialogRef.close(result);
  }
}
