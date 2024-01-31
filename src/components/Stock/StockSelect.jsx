import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import uuid from 'react-uuid'

const Filters = [
  {
    id: uuid(),
    name: "Any",
   },
  {
    id: uuid(),
    name: ">",
   },
   {
     id: uuid(),
    name: "<",
   },
  {
    id: uuid(),
    name: "=",
  },
  {
    id: uuid(),
    name: "<>",
   },
  {
    id: uuid(),
    name: "Item Number",
  },
  {
    id: uuid(),
    name: "Item No. Start",
  },
  {
    id: uuid(),
    name: "Original Number",
  },
  {
    id: uuid(),
    name: "Original No. Start",
  },
  {
    id: uuid(),
    name: "Set",
   },
  {
    id: uuid(),
    name: "Category",
   },
  {
    id: uuid(),
    name: "Unit",
   },
  {
    id: uuid(),
    name: "Brand",
  },
  {
    id: uuid(),
    name: "Origin",
   },
   {
     id: uuid(),
     name: "Suplier",
    },
    {
      id: uuid(),
      name: "Size",
     },
    {
      id: uuid(),
      name: "Color",
     },
    {
      id: uuid(),
      name: "Family",
     },
    {
      id: uuid(),
      name: "Group",
     },
  ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function StockSelect(props) {
  
  return (
    <Listbox value={props.selected} onChange={(e)=>{
      props.SelectHandler(e);
      
    }} >
      {({ open }) => (
        <div className='flex flex-col max-w-[12rem] min-w-[10rem] m-auto pl-3 pr-1'>
          {/* <label
          htmlFor="price"
          className="block text-xl text-gray-700"
        >
          Filter By
        </label> */}
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-[0.4rem] pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="flex items-center">
                
                <span className="ml-3 block truncate">{props.selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="pl-1 absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {Filters.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'relative cursor-default select-none py-2  pr-2'
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex ">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}