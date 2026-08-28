import {Component, Input, OnChanges, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {BookmarksGroups} from './bookmarks-groups';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'lib-bookmarks',
  imports: [
    FormsModule
  ],
  templateUrl: './bookmarks.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnChanges {

  public readonly resetSearchKeys: string[] = ['Enter', 'Escape'];

  public search = '';
  public shouldResetSearch = true;

  @Input()
  public groups: BookmarksGroups = [];
  public filteredGroups: BookmarksGroups = [];

  constructor() {
  }

  public ngOnChanges(): void {
    this.onKeyUpOnSearch({key: ''} as KeyboardEvent);
  }

  public onKeyUpOnSearch(event: KeyboardEvent): void {
    if (this.shouldResetSearch) {
      if (this.resetSearchKeys.includes(event.key)) {
        this.search = '';
      }
    }
    this.filteredGroups = this.filterGroup(this.groups, this.search);
  }

  public clickOnBookmark(): void {
    if (this.shouldResetSearch) {
      this.search = '';
    }
  }

  /**
   * Filter groups input by filtering with search input (ignore case).
   * The groups are searched on title and on text of each bookmarks.
   *
   * @param groups the group to filter on.
   * @param search the search param (case ignored).
   */
  private filterGroup(groups: BookmarksGroups, search: string): BookmarksGroups {
    if (search) {
      const searchLowerCase = search.toLowerCase();
      return groups.map(group => {
        if (group.title.toLowerCase().indexOf(searchLowerCase) >= 0) {
          return group;
        } else {
          return {
            title: group.title,
            bookmarks: group.bookmarks.filter(bookmark =>
                bookmark.text.toLowerCase().indexOf(searchLowerCase) >= 0)
          };
        }
      }).filter(group => group.bookmarks.length > 0);
    } else {
      return groups;
    }
  }
}
