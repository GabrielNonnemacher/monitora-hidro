import { Component } from '@angular/core';
import { ABOUT_CARDS } from '../../shared/constants/about.constants';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.scss',
  standalone: true,
})
export class AboutPage {
  protected readonly aboutCards = ABOUT_CARDS;
}
