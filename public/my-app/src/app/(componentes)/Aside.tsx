import React from 'react'
import { CiFolderOn } from "react-icons/ci";

function Aside() {
  return (
    <aside className='bg-[#d5caca] flex flex-col '>
      <div className='flex gap-4 p-4 border-[0.5px] border-blue-100 hover hover:bg-blue-200 cursor-pointer'>
        <p><CiFolderOn size={22}/></p>
        <span>Meus produtos</span>
      </div>
      <div className='flex gap-4 p-4 border-[0.5px] border-blue-100 hover hover:bg-blue-200 cursor-pointer'>
        <p><CiFolderOn size={22}/></p>
        <span>Turmas</span>
      </div>
      <div className='flex gap-4 p-4 border-[0.5px] border-blue-100 hover hover:bg-blue-200 cursor-pointer'>
        <p><CiFolderOn size={22}/></p>
        <span>Registro de aulas</span>
      </div>
      <div className='flex gap-4 p-4 border-[0.5px] border-blue-100 hover hover:bg-blue-200 cursor-pointer'>
        <p><CiFolderOn size={22}/></p>
        <span>Histórico</span>
      </div>
      <div className='flex gap-4 p-4 border-[0.5px] border-blue-100 hover hover:bg-blue-200 cursor-pointer'>
        <p><CiFolderOn size={22}/></p>
        <span>Meu perfil</span>
      </div>

      
    </aside>
  )
}

export default Aside
