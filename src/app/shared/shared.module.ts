import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatListModule, MatTableModule, MatCardModule, MatAutocompleteModule} from '@angular/material';

const MODULES = [CommonModule, FormsModule, MatFormFieldModule,
   MatInputModule, MatIconModule, MatButtonModule, MatListModule, MatTableModule, MatCardModule, MatAutocompleteModule];
@NgModule({
  declarations: [],
  imports: [MODULES],
  exports: [MODULES]
})
export class SharedModule { }
