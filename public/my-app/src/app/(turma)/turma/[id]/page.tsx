"use client"
import React, { useEffect, useState } from 'react';
import Header from '@/app/(componentes)/Header';
import Aside from '@/app/(componentes)/Aside';
import { Turma } from '@/types/Turma';
import { fetchClient } from '@/app/services/fetchClient';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'


export default function TurmaInfo({ params }: { params: { id: String } }) {
  const [myclass, setMyclass] = useState<Turma>({});
  const [loading, setLoading] = useState(true); 
  const router = useRouter();
  const id = params.id;
  
  useEffect(() => {
    fetchClient(`http://192.168.15.6:8080/turmas/${id}`).then(async (response) => {
      if (response.status === 200) {
        const data = await response.json();
        setMyclass(data);
      }
      setLoading(false); 
    }).catch((error) => {
      console.error("Erro ao buscar a turma:", error);
      setLoading(false); 
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className='flex'>
        <Aside />
        <div className="container mx-auto p-4 ">
          <div className='flex justify-between'>
              <h1 className="text-2xl font-bold mb-4">{myclass.name}</h1>
              <Link href={`new/${id}`}>Novo aluno</Link>
              <h1>id dessa turma: {id}</h1>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">Professor</h2>
            <div>
                    { myclass.teachers && myclass.teachers?.length > 0 ? (
                      myclass.teachers.map((teacher, index) => (
                        <div key={teacher.id}>
                          <p>Nome:  {teacher.name}</p>
                          <p>Email: {teacher.email}</p>
                          <p>Hora Aula: {teacher.hrAula}</p>
                          <p>Especialidade: {teacher.especialidade}</p>

                        </div>
                      ))
                    ) : (
                      <p>Nenhum professor disponível.</p>
                    )}
                  </div>
          </div>

          <table className="min-w-full bg-white border border-gray-300 ">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-100 border-b">Nome</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Email</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Matrícula</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Pontuação</th>
              </tr>
            </thead>
            <tbody>
              {myclass && myclass.students && myclass.students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-300 cursor-pointer" onClick={() => router.push(`/aluno/${student.id}`)}>
                 
                    
                    <td className="py-2 px-4 border-b">{student.name}</td>
                    <td className="py-2 px-4 border-b">{student.email}</td>
                    <td className="py-2 px-4 border-b">{student.registration}</td>
                    <td className="py-2 px-4 border-b">{student.points}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
