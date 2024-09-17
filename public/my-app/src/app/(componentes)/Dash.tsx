"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ClassCard from './Card';
import SkeletonCard from './SkeletonCard';
import { Turma } from '../../../types/Turma';
import { fetchClient } from '../services/fetchClient';
import apiUrl from '../services/utils';
import Link from 'next/link';
const Dashboard: React.FC = () => {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();

  const userRole = session?.user.userRole;
  const userName = session?.user.name;
  const id = session?.user.id;

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        let url = userRole === 'ROLE_STUDENT' ? `/turma/${id}` : `/turmas`;
        const response = await fetchClient(url);

        if (response.status === 200) {
          const data = await response.json();

          if (userRole === 'ROLE_TEACHER') {
            const filteredTurmas = data.filter((turma: Turma) =>
              turma.teachers?.some((teacher) => teacher.name === userName)
            );
            setTurmas(filteredTurmas);
          } else if (userRole === 'ROLE_ADMIN') {
            setTurmas(data);
          } else {
            setTurmas(data);
          }
        } else {
          throw new Error('Falha ao buscar turmas');
        }
      } catch (error) {
        console.error('Erro ao buscar turmas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTurmas();
  }, [id, userRole, userName]);

  return (
    <div className='mx-auto'>
      <div className='flex justify-center items-center gap-4 mx-auto w-full '>
        {userRole === 'ROLE_ADMIN' && (
          <Link className="block mt-2  bg-blue-300 w-[120px] text-white py-2 rounded-md text-center" href={'/turma/new'}>
            Cadastrar Turma
          </Link>
        )}
         {userRole === 'ROLE_ADMIN' && (
          <Link className="block mt-2  bg-blue-300 w-[120px] text-white py-2 rounded-md text-center" href={'/teacher'}>
            Cadastrar Teacher
          </Link>
        )}
      </div>
        
        <main className="container flex flex-wrap justify-center gap-6 md:gap-x-6 md:gap-y-2 mx-auto w-full md:p-4">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
            : turmas.map((turma: Turma) => (
                <ClassCard
                  key={turma.id}
                  id={turma.id ?? 'id da turma'}
                  nome={turma.name ?? 'Nome não disponível'}
                  horario={turma.horario ?? 'Horário não disponível'}
                  professor={turma.teachers?.map((x) => x.name).join(', ') ?? 'Professor não disponível'}
                  descricao={turma.trilha ?? 'Descrição não disponível'}
                />
              ))}
        </main>
      </div>    
  );
};

export default Dashboard;
