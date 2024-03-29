import { Component, Input, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements OnInit {
  @Input() control!: string;
  @Input() type!: string;
  @Input() label!: string;
  @Input() autocomplete!: string;
  @Input() icon!: string;
  @Input() readonly: boolean = false; // Añadir esto
  @Input() maxlength: number;

  isPassword!: boolean;
  hide: boolean = true;

  constructor() {}

  ngOnInit() {
    if (this.type == 'password') this.isPassword = true;
  }
  showOrHidePassword() {
    this.hide = !this.hide;

    if (this.hide) this.type = 'password';
    else this.type = 'text';
  }
}
