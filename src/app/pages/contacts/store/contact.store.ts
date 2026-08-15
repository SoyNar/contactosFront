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
        c.phone.toLowerCase().includes(q)
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
        const contacts = await firstValueFrom(contactsService.getAll());
        patchState(store, { contacts, loading: false });
      } catch {
        patchState(store, { loading: false, error: 'No se pudieron cargar los contactos' });
      }
    },

    // async create(contact: Omit<Contact, 'id'>) {
    //   const created = await firstValueFrom(contactsService.create(contact));
    //   patchState(store, { contacts: [...store.contacts(), created] });
    // },

    // async update(id: number, changes: Partial<Contact>) {
    //   const updated = await firstValueFrom(contactsService.update(id, changes));
    //   patchState(store, {
    //     contacts: store.contacts().map(c => (c.id === id ? updated : c)),
    //   });
    // },

    // async remove(id: number) {
    //   await firstValueFrom(contactsService.delete(id));
    //   patchState(store, { contacts: store.contacts().filter(c => c.id !== id) });
    // },
  }))
);


