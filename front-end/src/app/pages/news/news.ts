import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { LIST_NEWS } from '../../shared/constants/news.constants';

@Component({
  selector: 'app-news',
  templateUrl: './news.html',
  styleUrl: './news.scss',
  standalone: true,
  imports: [MatIcon, MatTooltip, MatButtonModule],
})
export class NewsPage {
  protected readonly news = LIST_NEWS;
}
