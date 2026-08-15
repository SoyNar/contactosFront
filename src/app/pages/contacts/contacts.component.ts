import { Component, inject, OnInit, signal, ViewChildren } from '@angular/core';
import { ContactFormComponent } from '../../shared/components/contact-form/contact-form.component';
import { ContactsStore } from './store/contact.store';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../shared/models/contact';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-contacts',
    imports: [ContactFormComponent,FormsModule,ConfirmDialogModule],
    templateUrl: './contacts.component.html',
    styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {


    private confirmationService = inject(ConfirmationService);


    ngOnInit(): void {
        this.contactStore.load();
    }

    showModal : boolean = false;
    editingContact =  signal<Contact | null>(null);

     contactStore = inject(ContactsStore)


    openModal(value:boolean, contact:Contact | null = null){
        this.editingContact.set(contact || null);
        console.log("contacto:", contact);
        this.showModal = value;
    }

    saveContact(contact:any){
        console.log("Contact saved:", contact);
        this.showModal = false;
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
            // accept:() => {contacStore.remove(contact.id!);},
        })
        
    }

}
