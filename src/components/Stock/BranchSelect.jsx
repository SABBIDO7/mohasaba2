import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import uuid from 'react-uuid';
// const Filters = [
//   {
//     id: 0,
//     name: "Any",
//    },
 
//   ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function BranchSelect(props) {
  let Filters = props.branches

  let isactive = false;
  if(!props.branchSearch){
   isactive = true
  }

  
  
  return (
    <Listbox value={props.selected}
    disabled={isactive}
       onChange={(e)=>{
      props.setActiveBranch(e);
      props.fData(1,e[0])
    }} 
    onClick={()=>{
     
      }}>
      {({ open }) => (
        <div className='flex flex-col max-w-[11rem] min-w-[7rem]'>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-[0.32rem] pl-3 pr-10  text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm max-h-[2.5rem]">
              <span className="flex items-center">
                
                <span className="ml-3 block truncate">{props.selected}</span>
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
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'relative cursor-default select-none py-2  pr-2'
                      )
                    }
                    value={person["key"]+person["split"]+person["val"]}
                 
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex ">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {person["key"]+person["split"]+person["val"]}
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