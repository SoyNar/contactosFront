import { Component, inject, OnInit, signal, ViewChildren } from '@angular/core';
import { ContactFormComponent } from '../../shared/components/contact-form/contact-form.component';
import { ContactsStore } from './store/contact.store';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../shared/models/contact';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-contacts',
    imports: [ContactFormComponent,FormsModule,ConfirmDialogModule,JsonPipe],
    templateUrl: './contacts.component.html',
    styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {

    //services

    private confirmationService = inject(ConfirmationService);


    ngOnInit(): void {
        this.contactStore.load();
    }

    //varaibles
    showModal : boolean = false;
    editingContact =  signal<Contact | null>(null);

     contactStore = inject(ContactsStore)

       //methods

openModal(value: boolean, contact: Contact | null = null) {
  this.showModal = value;
  const clonedContact = contact ? { ...contact, phone: [...(contact.phone || [])] } : null;
  this.editingContact.set(clonedContact);
  console.table(contact);
  console.log("Contacto seleccionado:", JSON.parse(JSON.stringify(contact)));
}


saveContact(contact: any) {
this.showModal = false;

const payload = {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
};

const editing = this.editingContact();

if (editing?.id) {
this.contactStore.update(editing.id, payload);
} else {
this.contactStore.create(payload);
}

this.editingContact.set(null);
}


confirmDelete(contact:Contact){
this.confirmationService.confirm({
    header: 'Confirmación de eliminación',
    message: ` Esta segura que desea eliminar el contacto ${contact.name}?`,
    icon: 'pi pi-exclamation-triangle',
    acceptLabel:'Aceptar',
    rejectLabel:'Cancelear',
    acceptButtonStyleClass:'p-button-danger',
    rejectButtonStyleClass:'p-button-secondary',
    accept:() => {this.contactStore.remove(contact.id!);},
    reject:() => {console.log("Cancelado");}
})

}

}
