import { Component, effect, inject, input, output, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormArray, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from '../../models/contact';
import { InputTextModule } from 'primeng/inputtext';
import { phoneNumberValidator } from '../../Validators/phonNumberValidators';

@Component({
  selector: 'contact-form',
  imports: [DialogModule, InputMaskModule, ButtonModule, ReactiveFormsModule,InputTextModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {

  // signals

  visible = input<boolean>(false);
  headerTitle = signal<boolean>(false);
  visibleChange = output<boolean>();
  sendContact = output<any>();
  contact = input<Contact | null>(null);

  private fb = inject(FormBuilder);
private phoneValidators = [
  Validators.required,
  phoneNumberValidator()
];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phones: this.fb.array(
    [this.fb.control('', this.phoneValidators)],
    Validators.required
  ),
  });

  public constructor() {
    effect(() => {
      const c = this.contact();

      this.form.patchValue({
        name: c?.name ?? '',
        email: c?.email ?? '',
      });

   this.phones.clear();
const phoneList = c?.phone && c.phone.length > 0 ? c.phone : [''];
phoneList.forEach(p => this.phones.push(this.fb.control(p, this.phoneValidators)));
this.headerTitle.set(!!c);
    });
  }

  //getters

  get phones(): FormArray<FormControl<string | null>> {
    return this.form.get('phones') as FormArray<FormControl<string | null>>;
  }

  get isEdit(): boolean {
    return !!this.contact();
  }

//mmethods
addPhone(): void {
  this.phones.push(this.fb.control('', this.phoneValidators));
}

  removePhone(index: number): void {
    if (this.phones.length > 1) {
      this.phones.removeAt(index);
    }
  }

  openModal(value: boolean): void {
    this.visibleChange.emit(value);
  }

  close(): void {
    this.visibleChange.emit(false);
    this.form.reset();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.value;
    const contact = {
      name: raw.name,
      email: raw.email,
      phone: (raw.phones ?? []).filter((p): p is string => !!p && p.trim() !== ''),
    };

    this.sendContact.emit(contact);
    this.form.reset();
    this.phones.clear();
this.phones.push(this.fb.control('', this.phoneValidators));  }
}