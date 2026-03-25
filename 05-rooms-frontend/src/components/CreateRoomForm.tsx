'use client';
 
import {useActionState} from 'react';
import {createRoom} from '../app/create/actions';
 
type FormState = {
  error: string;
  values?: { title: string; description: string; heroUrl: string; priceAmount: string };
};

const initialState: FormState = {error: ''};
 
export default function CreateRoomForm() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(createRoom, initialState);
  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state.error && <ErrorMessage message={state.error} />}
      <FormField label="Title" id="title" type="text" disabled={isPending}
        placeholder="e.g. Cozy cabin" defaultValue={state.values?.title ?? ''} />
 
      <FormTextarea label="Description" id="description" disabled={isPending}
        placeholder="Describe the room." defaultValue={state.values?.description ?? ''}/>
 
      <FormField label="Hero URL from pxhere.com" id="heroUrl" type="text" disabled={isPending}
        placeholder="https://c.pxhere.com/..."
        hint="Only URLs from https://c.pxhere.com can be used." defaultValue={state.values?.heroUrl ?? ''}/>

      <div className='flex items-end justify-between'>
        <PriceField disabled={isPending} defaultValue={state.values?.priceAmount ?? ''}/> 
        <SubmitButton isPending={isPending} />
      </div>
    </form>
  );
}
 
function FormField({label, id, type, disabled, placeholder, hint, defaultValue}: {label: string; id: string; type: string; disabled: boolean; placeholder?: string; hint?: string, defaultValue?: string;}) {
  return (
    <div className="flex flex-col gap-1.5 flex-1">
      <label htmlFor={id} className="text-base font-medium text-gray-700">
        {label}
      </label>
      <input id={id} name={id} type={type} required disabled={disabled} placeholder={placeholder} defaultValue={defaultValue}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 disabled:bg-gray-50 disabled:text-gray-400"/>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
 
function FormTextarea({label, id, disabled, placeholder, defaultValue}: {label: string; id: string; disabled: boolean; placeholder?: string; defaultValue?: string;}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-base font-medium text-gray-700">
        {label}
      </label>
      <textarea id={id} name={id} required disabled={disabled} rows={4} placeholder={placeholder} defaultValue={defaultValue}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 disabled:bg-gray-50 disabled:text-gray-400 resize-none"/>
    </div>
  );
}

function PriceField({disabled, defaultValue}: {disabled: boolean, defaultValue?: string}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="priceAmount" className="text-base font-medium text-gray-700">
        Price per night
      </label>
      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-cyan-600">
        <input id="priceAmount" name="priceAmount" type="number" required disabled={disabled} placeholder="100" min="1" defaultValue={defaultValue} 
        className="flex-1 px-2 py-2 w-90 text-sm focus:outline-none disabled:bg-gray-50"/>
        <span className="px-2 py-2 text-sm bg-gray-50 border-l border-gray-200 text-gray-500">
          USD
        </span>
      </div>
    </div>
  );
}
 
function ErrorMessage({message}: {message: string}) {
  return (
    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex gap-2 shadown-sm">
      <span>⚠︎</span>
      <span>{message}</span>
    </div>
  );
}
 
function SubmitButton({isPending}: {isPending: boolean}) {
  return (
    <button type="submit" disabled={isPending} 
    className="mt-2 px-7 py-2.5 bg-cyan-600 gap-4 text-white text-sm font-medium rounded-lg hover:bg-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-800 focus-visible:ring-offset-0 disabled:bg-cyan-200 disabled:cursor-not-allowed transition-colors">
      {isPending ? 'Creating room...' : 'Create Room'}
    </button>
  );
}