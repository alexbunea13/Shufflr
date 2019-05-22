import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,
   MatListModule, MatTableModule, MatCardModule, MatAutocompleteModule,
   MatProgressBarModule, MatToolbarModule, MatMenuModule } from '@angular/material';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

const MODULES = [
   CommonModule, FormsModule, MatFormFieldModule,
   MatInputModule, MatIconModule, MatButtonModule, MatListModule,
   MatTableModule, MatCardModule, MatAutocompleteModule, NgxYoutubePlayerModule,
   MatProgressBarModule, MatToolbarModule, MatMenuModule, OverlayModule];
@NgModule({
   declarations: [],
   imports: [MODULES],
   exports: [MODULES],
})
export class SharedModule { }
