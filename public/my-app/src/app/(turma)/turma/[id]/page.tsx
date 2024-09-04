"use client";
import React, { useEffect, useState } from 'react';
import Header from '@/app/(componentes)/Header';
import Aside from '@/app/(componentes)/Aside';
import { Turma } from '../../../../../types/Turma';
import { fetchClient } from '@/app/services/fetchClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaPlus } from "react-icons/fa6";
import { useSession } from 'next-auth/react';
import SkeletonCard from '@/app/(componentes)/SkeletonCard';

export default function TurmaInfo({ params }: { params: { id: string } }) {
  const [myclass, setMyclass] = useState<Turma[]>([]); 
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const idTurma = params.id;
  const { data: session } = useSession();

  const userRole = session?.user?.userRole;
  const idUser = session?.user?.id;

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const endpoint = userRole === 'ROLE_STUDENT' ? `/turma/${idUser}` : `/turmas/${idTurma}`;
        const response = await fetchClient(endpoint);

        if (response.status === 200) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setMyclass(data); 
          } else {
            setMyclass([data]); 
          }
        } else {
          throw new Error('Falha ao buscar turmas');
        }
      } catch (error) {
        console.error('Erro ao buscar turma(s):', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTurmas();
  }, [userRole, idUser, idTurma]);

  if (loading) {
    return (
      <div className=" bg-custom-gradient">
        {Array.from({ length: 1 }).map((_, index) => (
          <>
          <Header/>
          <div className='flex'>
            <Aside/>
            <div className='w-[80%] mx-auto flex flex-col gap-10 mt-4'>
                <div className='h-12 bg-gray-300 rounded mb-4'></div>
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[60px] rounded-t-lg w-full p-4 animate-pulse duration-1000">
                      <h2 className="text-xl text-white font-semibold mb-4">Professor</h2>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[60px] rounded-t-lg w-full p-4 animate-pulse duration-1000">
                        <h2 className="text-xl text-white font-semibold mb-4">Aulas</h2>
              </div>
            </div>
          </div>
          
          </>
        ))}
      </div>
    );
  }

  if (myclass.length === 0) {
    return <p className="text-gray-500">Nenhuma turma disponível.</p>;
  }

  return (
    <>
      <Header />
      <div className='flex flex-row md:flex-row bg-custom-gradient'>
        <Aside/>
        <div className="container mx-auto p-4">
          {myclass.map((turma, index) => (
            <div key={turma.id || index} className="mb-6">
              <div className='flex flex-col md:flex-row justify-between mb-4'>
                <h1 className="text-2xl font-bold">{turma.name}</h1>
                <div className='flex gap-2 mt-2 md:mt-0'>
                  {userRole === 'ROLE_TEACHER' && (
                    <Link href={`/aula/registrar/${idTurma}`} className="bg-blue-600 p-2 text-white rounded-md cursor-pointer flex items-center gap-1 hover:text-green-300">
                      <FaPlus size={12} color='white' />
                      <span className='font-bold'>NOVA AULA</span>
                    </Link>
                  )}
                  {userRole === 'ROLE_ADMIN' && (
                    <Link href={`new/${idTurma}`} className="bg-blue-600 p-2 text-white rounded-md cursor-pointer flex items-center gap-1 hover:text-green-300">
                      <FaPlus size={12} color='white' />
                      <span className='font-bold'>Novo aluno</span>
                    </Link>
                  )}
                </div>
              </div>
  
              <div>
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 h-[60px] rounded-t-lg w-full p-4">
                  <h2 className="text-xl text-white font-semibold mb-4">Professor</h2>
                </div>
                <div>
                  {turma.teachers && turma.teachers.length > 0 ? (
                    turma.teachers.map((teacher) => (
                      <div key={teacher.id} className="border border-gray-300 rounded-b-lg p-4 mb-4 bg-white">
                        <p className="text-gray-700 font-medium">Nome: <span className="font-normal">{teacher.name}</span></p>
                        <p className="text-gray-700 font-medium">Email: <span className="font-normal">{teacher.email}</span></p>
                        <p className="text-gray-700 font-medium">Especialidade: <span className="font-normal">{teacher.especialidade}</span></p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Nenhum professor disponível. Caso não apareça nenhuma informação, pressione F5.</p>
                  )}
                </div>
              </div>
  
              <Link href="/aula">
                <div>
                  <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 h-[60px] rounded-t-lg w-full p-4 flex flex-col md:flex-row justify-between items-center">
                    <h2 className="text-xl text-white font-semibold mb-4 md:mb-0">Aulas</h2>
                    <h2 className="text-xl text-white font-semibold mb-4 md:mb-0">Visualizar</h2>
                  </div>
                  {turma.aulas && turma.aulas.length > 0 ? (
                    turma.aulas.map((aula: any, index: any) => (
                      <div key={aula.id} className="border border-gray-300 rounded-b-lg p-4 mb-4 bg-white">
                        <p className="text-gray-700 font-medium">Conteúdo: <span className="font-normal">{aula.conteudo}</span></p>
                        <p className="text-gray-700 font-medium">Link: <span className="font-normal">{aula.linkAtividade}</span></p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Nenhuma aula disponível.</p>
                  )}
                </div>
              </Link>
  
              <table className="min-w-full border border-purple-700 rounded-sm">
                <thead>
                  <tr className='bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white'>
                    <th className="py-2 px-4 border-b text-left">Nome</th>
                    <th className="py-2 px-4 border-b text-left hidden md:block">Email</th>
                    {userRole === 'ROLE_ADMIN' && (
                      <>
                        <th className="py-2 px-4 border-b text-left">Matrícula</th>
                        <th className="py-2 px-4 border-b text-left">Pontuação</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className='bg-white'>
                  {turma.students && turma.students.length > 0 ? (
                    turma.students.map((student) => (
                      <tr
                        key={student.id}
                        className="hover:bg-purple-100 cursor-pointer"
                        onClick={userRole === 'ROLE_STUDENT' ? undefined : () => router.push(`/aluno/${student.id}`)}
                      >
                        <td className="py-2 px-4 border-b">{student.name}</td>
                        <td className="py-2 px-4 border-b hidden md:block">{student.email}</td>
                        {userRole === 'ROLE_ADMIN' && (
                          <>
                            <td className="py-2 px-4 border-b">{student.registration}</td>
                            <td className="py-2 px-4 border-b">{student.points}</td>
                          </>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={userRole === 'ROLE_ADMIN' ? 4 : 2} className="py-2 px-4 border-b text-center text-gray-500">Nenhum aluno disponível.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
