import React from 'react'
import { CiEdit } from "react-icons/ci";
import Link from 'next/link';
import Search from './Search';
import { FaPlus } from "react-icons/fa6";

function Table() {
  return (
    <div  className='h-screen bg-gray-500 p-5 w-full'>
         <div className='flex flex-col gap-[25px] md:gap-0 md:flex md:flex-row md:justify-between md:items-center'>
          <div><h1 className="text-xl mb-2">Alunos </h1></div>
          <div>
                <Search/>
          </div>
          <Link href="/turma/novo" className='bg-green-600 hover:bg-green-800 cursor-pointer text-white p-3 rounded-md flex items-center gap-2'> novo aluno  <FaPlus size={14} color='white'/></Link>
         
         </div>
 
        <div className="overflow-auto rounded-lg shadow mt-8">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">Id</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Nome</th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Status</th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Ações</th>
              
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
            <tr className="bg-gray-50 hover:bg-gray-100">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <a href="#" className="font-bold text-blue-500 hover:underline">001</a>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Legado
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
              <span
                className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Ativo</span>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">16/10/2021</td>
              
            </tr>
            <tr className="bg-gray-50 hover:bg-gray-100">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <a href="#" className="font-bold text-blue-500 hover:underline">10002</a>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">Legado</td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
              <span
                className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">Ausente</span>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">16/10/2021</td>
              
            </tr>
            <tr className="bg-gray-50 hover:bg-gray-100">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <a href="#" className="font-bold text-blue-500 hover:underline">10002</a>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">Legado</td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
              <span
                className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">Inativo</span>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">16/10/2021</td>
              
            </tr>
            </tbody>
          </table>
        </div>

        
    </div>
  )
}

export default Table