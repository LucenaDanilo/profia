"use client"
import React from 'react';
import customSession from '../customHooks/customSession';
import { FaBook, FaClock, FaClipboardList, FaPenFancy } from 'react-icons/fa';
import ClassCard from './Card';
import Link from 'next/link';
import { Turma } from '@/types/Turma';
import { useEffect, useState } from 'react';
import { fetchClient } from '../services/fetchClient';
import { useSession } from 'next-auth/react';
const Dashboard: React.FC = () => {
  const [turmas, setTurmas] = useState<Turma[]>([])
  const {data: session} = useSession()
  console.log('logado', session?.user.userRole)
  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await fetchClient("http://192.168.100.60:8080/turmas");
        if (response.status === 200) {
          const data = await response.json();
          setTurmas(data)
        } else {
          throw new Error('Falha ao buscar turmas');
        }
      } catch (error) {
        console.error('Erro ao buscar turmas:', error);
      }
    };
    fetchTurmas();

  }, []); 
  console.log("minhas turmas: ",turmas)
  return (
    
    <main className=" container flex flex-wrap min-h-full justify-center gap-6 md:gap-x-6 md:gap-y-2 mx-auto w-[90%] md:p-4">
      {turmas.map((turma:Turma, index:any)=> {
        return(
          <>
           <ClassCard

                id={turma.id ?? 'id da turma'}
                nome={turma.name ?? 'Nome não disponível'}
                horario={turma.horario ?? 'Horário não disponivel'}
                professor={turma.teachers?.map((x) => x.name).join(', ') ?? 'Professor não disponível'}
                descricao={turma.trilha ?? 'Descrição não disponível'}
              />
          </>
        )
      })}
       

  </main>
  );
};

export default Dashboard;