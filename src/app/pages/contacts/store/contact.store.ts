import { computed, inject } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { ContactService } from '../services/contact.service';
import { Contact, ContactState } from '../../../shared/models/contact';


    const initialState: ContactState = {
  contacts: [],
  query: '',
  loading: false,
  error: null,
};

export const ContactsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed(({ contacts, query }) => ({
    filteredContacts: computed(() => {
      const q = query().trim().toLowerCase();
      if (!q) return contacts();
      return contacts().filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone?.some(phone_number => phone_number.toLowerCase().includes(q))
      );
    }),
    count: computed(() => contacts().length),
  })),

  withMethods((store, contactsService = inject(ContactService)) => ({
    setQuery(query: string) {
      patchState(store, { query });
    },

    async load() {
      patchState(store, { loading: true, error: null });
      try {
        const response = await firstValueFrom(contactsService.getAll());
        if (response.success && response.data) {
          patchState(store, { contacts: response.data, loading: false });
        } else {
          patchState(store, { loading: false, error: response.error || 'No se pudieron cargar los contactos' });
        }
      } catch {
        patchState(store, { loading: false, error: 'No se pudieron cargar los contactos' });
      }
    },

   async create(contact: Omit<Contact, 'id'>) {
  patchState(store, { error: null });
  try {
    const response = await firstValueFrom(contactsService.create(contact));
    patchState(store, { contacts: [...store.contacts(), response.data] });
  } catch (err: any) {
    patchState(store, { error: err?.error?.error ?? 'No se pudo crear el contacto' });
  }
},

   async update(id: number, changes: Partial<Contact>) {
  patchState(store, { error: null });
  try {
    const response = await firstValueFrom(contactsService.update(id, changes));
    patchState(store, {
      contacts: store.contacts().map(c => (c.id === id ? response.data : c)),
    });
  } catch (err: any) {
    patchState(store, { error: err?.error?.error ?? 'No se pudo actualizar el contacto' });
  }
},

    async remove(id: number) {
      await firstValueFrom(contactsService.delete(id));
      patchState(store, { contacts: store.contacts().filter(c => c.id !== id) });
    },
  }))
);


