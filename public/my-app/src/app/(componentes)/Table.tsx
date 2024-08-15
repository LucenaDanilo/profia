import React from 'react'
import { CiEdit } from "react-icons/ci";

function Table() {
  return (
    <div  className='h-screen bg-gray-500 p-5 w-full'>
         <h1 className="text-xl mb-2">Alunos</h1>
 
        <div className="overflow-auto rounded-lg shadow">
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
                Antonio Moraes Lino
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
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">Antonio Moraes Lino</td>
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
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">Antonio Moraes Lino</td>
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