import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'loader',
  imports: [MatProgressSpinner],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {}
