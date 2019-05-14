import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,
   MatListModule, MatTableModule, MatCardModule, MatAutocompleteModule,
    MatProgressBarModule, MatToolbarModule, MatChipsModule} from '@angular/material';
import {NgxYoutubePlayerModule} from 'ngx-youtube-player';

const MODULES = [CommonModule, FormsModule, MatFormFieldModule,
   MatInputModule, MatIconModule, MatButtonModule, MatListModule,
    MatTableModule, MatCardModule, MatAutocompleteModule, NgxYoutubePlayerModule,
    MatProgressBarModule, MatToolbarModule, MatChipsModule];
@NgModule({
  declarations: [],
  imports: [MODULES],
  exports: [MODULES]
})
export class SharedModule { }
