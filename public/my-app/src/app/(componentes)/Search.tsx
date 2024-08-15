import React from 'react'
import { IoSearchSharp } from "react-icons/io5";

function Search() {
  return (
    <div className='flex justify-between py-3 px-6 boorder-b'>
        <form action="" className='w-full max-w-md'>
            <div className='relative flex items-center text-gray-400 focus-within:text-gray-600'>
                <IoSearchSharp className='w-5 h-5 absolute ml-3 pointer-events-none'/>
                <input type="text" 
                name="search" 
                placeholder='Search' 
                autoComplete='off'
                aria-label='Search'
                className='w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-400 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2'/>
                <div>
                <div className="ml-2">
                        <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 truncate">
                            <option selected={true}>Filtrar</option>
                            <option value="Scratch">Scratch</option>
                            <option value="Frontend01">Frontend01</option>
                            <option value="ScratchPlus">ScratchPlus</option>
                            <option value="ScratchPlus02">ScratchPlus02</option>
                        </select>
                    </div>
                </div>
            </div>

        </form>
    </div>
  )
}

export default Search