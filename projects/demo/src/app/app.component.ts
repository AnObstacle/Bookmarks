import { Component, ChangeDetectionStrategy } from '@angular/core';
import {BookmarksComponent, BookmarksGroups} from 'bookmarks';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [BookmarksComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public group: BookmarksGroups = environment.data.bookmarks;
}
