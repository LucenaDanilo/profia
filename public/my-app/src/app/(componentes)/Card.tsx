import React from 'react';
import { FaBook, FaClock, FaClipboardList, FaPenFancy } from 'react-icons/fa';
import Link from 'next/link';
interface ClassCardProps {
  nome: string;
  horario: string;
  professor: string;
  descricao: string;
  id: string;
}

const ClassCard: React.FC<ClassCardProps> = ({ id, nome, horario, professor, descricao }) => {
  return (
    <Link href={`/turma/${id}`}>
    <div className='bg-white p-2 md:p-4 hover:bg-gray-100 border-[1px] flex flex-col justify-between border-blue-700 w-[250px] h-[250px] mt-6 md:mt-0 md:w-[300px] lg:w-[330px] rounded-md '>
      <div className='w-full'>
        <h1 className='text-lg font-bold mb-2'>{nome}</h1>
        <p className='flex items-center'><FaClock className='mr-2' color='purple' /><span className='font-semibold'>Horário: </span>{horario}</p>
        <p className='flex items-center'><FaClock className='mr-2' color='purple' /><span className='font-semibold'>Professor: </span>{professor}</p>
        <p className='flex items-center'>{descricao}</p>
      </div>
      <div className='border-t-[1px] border-black py-4 flex justify-between'>
        <div className='flex items-center cursor-pointer'>
          <FaClipboardList className='mr-2' />
          <span>Atividades</span>
        </div>
        <div className='flex items-center cursor-pointer'>
          <span className='text-green-700'>Minhas Notas</span>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ClassCard;
