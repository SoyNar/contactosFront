import { Component, signal, ViewChildren } from '@angular/core';
import { ContactFormComponent } from '../../shared/components/contact-form/contact-form.component';

@Component({
    selector: 'app-contacts',
    imports: [ContactFormComponent],
    templateUrl: './contacts.component.html',
    styleUrl: './contacts.component.css'
})
export class ContactsComponent {

    showModal : boolean = false;
    editingContact =  signal<boolean>(false);


    openModal(value:boolean){
        this.showModal = value;
    }

    saveContact(contact:any){
        console.log("Contact saved:", contact);
        this.showModal = false;
    }

}
