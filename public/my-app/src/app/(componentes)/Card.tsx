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
    <Link href={`/turma/${id}`} className='w-[250px] h-[350px] lg:w-[330px] rounded-lg md:w-[300px] bg-[#2c2f3a] p-4 hover:bg-[#3a3f4c] border border-[#1d1f22] transition-shadow duration-300 ease-in-out shadow-lg hover:shadow-2xl flex flex-col justify-between mt-6 md:mt-0'>
      <div className='flex flex-col h-full'>
        <div className='mb-4'>
          <h1 className='text-xl font-bold mb-2 text-white'>{nome}</h1>
          <p className='flex items-center mb-1'>
          <FaClock className='mr-2' color='#5fcdee' />
          <span className='font-semibold text-orange-300'>Horário:</span>
          <span className='ml-1 text-gray-300'>{horario}</span>
          </p>
          <p className='flex items-center mb-1'>
            <FaBook className='mr-2' color='#5fcdee' />
            <span className='font-semibold text-orange-300'>Professor:</span>
            <span className='ml-1 text-gray-300'>{professor}</span>
          </p>
        <p className='text-gray-300'>{descricao}</p>
        </div>
        <div className='border-t border-gray-600 pt-4 flex justify-between text-gray-200'>
          <div className='flex items-center cursor-pointer hover:text-blue-400 transition-colors duration-300'>
            <FaClipboardList className='mr-2' fill='#5fcdee'/>
            <span>Atividades</span>
          </div>
          
        </div>
      </div>
    </Link>
  );
};

export default ClassCard;
