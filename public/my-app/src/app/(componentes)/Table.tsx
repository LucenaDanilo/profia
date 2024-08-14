import React from 'react'
import { CiEdit } from "react-icons/ci";

function Table() {
  return (
    <div className='h-screen bg-gray-500 p-5 w-full'>
        <h1>Tabela de alunos</h1>
        <div className='overflow-auto rounded-lg shadow'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b-2 border-gray-200'>
              <tr>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Id</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Nome</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Turma</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Ações</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
            <tr className='bg-gray-50 hover:bg-gray-300 hover:cursor-pointer'>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                <a href="" className='font-bold text-blue-500 hover:underline'>001</a></td>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Sorak Siul da silva</td>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Scratch 01</td>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-500'>Ativo</span>
              </td>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap flex items-center'>Editar <CiEdit size={22}/></td>
            </tr>
            <tr className='bg-gray-50 hover:bg-gray-300 hover:cursor-pointer'>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                <a href="" className='font-bold text-blue-500 hover:underline'>001</a></td>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Sorak Siul da silva</td>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Scratch 01</td>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-500'>Ativo</span>
              </td>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap flex items-center'>Editar <CiEdit size={22}/></td>

            </tr>
            <tr className='bg-gray-50 hover:bg-gray-300 hover:cursor-pointer'>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                <a href="" className='font-bold text-blue-500 hover:underline'>001</a></td>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Sorak Siul da silva</td>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>Scratch 01</td>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-500'>Ativo</span>
              </td>
              <td className='p-3 text-sm text-gray-700 whitespace-nowrap flex items-center'>Editar <CiEdit size={18}/></td>

            </tr>
            
            
            </tbody>
          </table>
        </div>
        
    </div>
  )
}

export default Table