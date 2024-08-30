"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaBook, FaClock, FaClipboardList, FaPenFancy } from 'react-icons/fa';
import customSession from '../customHooks/customSession';
import ClassCard from './Card';
import SkeletonCard from './SkeletonCard';
import { Turma } from '@/types/Turma';
import { fetchClient } from '../services/fetchClient';
import Link from 'next/link';
import apiUrl from '../services/utils';

const Dashboard: React.FC = () => {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();

  const userRole = session?.user.userRole;
  const id = session?.user.id;

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await fetchClient(`${userRole == 'ROLE_STUDENT' ? `/turma/${id}` : `/turmas`}`);
        if (response.status === 200) {
          const data = await response.json();
          setTurmas(data);
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
  }, [id, userRole]);

  return (
    <main className="container flex flex-wrap min-h-full justify-center gap-6 md:gap-x-6 md:gap-y-2 mx-auto w-[90%] md:p-4">
      {loading
        ? Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
        : turmas.map((turma: Turma) => (
            <ClassCard
              key={turma.id}
              id={turma.id ?? 'id da turma'}
              nome={turma.name ?? 'Nome não disponível'}
              horario={turma.horario ?? 'Horário não disponivel'}
              professor={turma.teachers?.map((x) => x.name).join(', ') ?? 'Professor não disponível'}
              descricao={turma.trilha ?? 'Descrição não disponível'}
            />
          ))}
    </main>
  );
};

export default Dashboard;
