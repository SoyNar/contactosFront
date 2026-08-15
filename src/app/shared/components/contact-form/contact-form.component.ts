import { Component, inject, input, output, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from '../../models/contact';


@Component({
    selector: 'contact-form',
    imports: [DialogModule,InputMaskModule,ButtonModule,ReactiveFormsModule],
    templateUrl: './contact-form.component.html',
    styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {

     visible = input<boolean>(false);
     headerTitle = signal<boolean>(false);
     visibleChange = output<boolean>();
     sendContact = output<any>();

     private fb = inject(FormBuilder);

     //
     form = this.fb.group({
        name: [''],
        email: ['',[Validators.email,Validators.required]],
        phone: ['',[Validators.required]]
     });
     

     openModal(value:boolean){
        this.visibleChange.emit(value);
     }
     close(){
        this.visibleChange.emit(false);
     }
     onSubmit(){
        if(this.form.invalid){
         this.form.markAllAsTouched();
            console.log("Form is invalid");
            return;
        }

        const contact = this.form.value;
        this.sendContact.emit(contact);
        this.form.reset();
        // this.close();

     }



}
