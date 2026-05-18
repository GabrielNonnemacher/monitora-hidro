import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'empty-state',
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
  standalone: true,
})
export class EmptyStateComponent {
  public readonly hasError = input.required<boolean>();
}
