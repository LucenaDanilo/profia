"use client"
import React, { useEffect, useState } from 'react';
import Header from '@/app/(componentes)/Header';
import Aside from '@/app/(componentes)/Aside';
import { Turma } from '@/types/Turma';
import { fetchClient } from '@/app/services/fetchClient';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'
import { FaPlus } from "react-icons/fa6";
import { useSession } from 'next-auth/react';


export default function TurmaInfo({ params }: { params: { id: String } }) {
  const [myclass, setMyclass] = useState<Turma>({});
  const [loading, setLoading] = useState(true); 
  const router = useRouter();
  const idTurma = params.id;
  const {data: session } = useSession();

  const userRole = session?.user.userRole;
  const idUser = session?.user.id;
  console.log(userRole)
  useEffect(() => {
    fetchClient( `${userRole === 'ROLE_STUDENT' ? `http://192.168.15.6:8080/turma/${idUser}`: `http://192.168.15.6:8080/turmas/${idTurma}`}`).then(async (response) => {
      if (response.status === 200) {
        const data = await response.json();
        console.log('turma:', data)
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
        <p>Carregando... </p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className='flex'>
        <Aside />
        <div className="container mx-auto p-4 ">
          <div className='flex justify-between mb-4'>
              <h1 className="text-2xl font-bold ">{myclass.name}</h1>
              <Link href={`new/${idTurma}`} className={`bg-blue-600 p-2 text-white rounded-md cursor-pointer flex items-center gap-1 hover:text-green-300 ${userRole === 'ROLE_ADMIN' ? 'block': 'hidden'}`}><FaPlus size={12} color='white'/> <span className='font-bold '>Novo aluno</span></Link>
          </div>
          
          <div className="">
           <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[60px] rounded-t-lg w-full p-4">  <h2 className="text-xl  text-white font-semibold mb-4">Professor</h2></div>
            <div className=''>
              {myclass.teachers && myclass.teachers.length > 0 ? (
                myclass.teachers.map((teacher, index) => (
                  <div key={teacher.id} className="border border-gray-300 rounded-b-lg p-4 mb-4 bg-white">
                    <p className="text-gray-700 font-medium">Nome: <span className="font-normal">{teacher.name}</span></p>
                    <p className="text-gray-700 font-medium">Email: <span className="font-normal">{teacher.email}</span></p>
                    <p className="text-gray-700 font-medium">Especialidade: <span className="font-normal">{teacher.especialidade}</span></p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Nenhum professor disponível. F5 Caso não apareça nenhuma informação, pressione F5. isso ocorre devido ao carregamento do component que é mais rapido que o retorno da api.</p>
              )}
            </div>
          </div>
          <Link href="/aula">
            <div>
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[60px] rounded-t-lg w-full p-4"><h2 className="text-xl  text-white font-semibold mb-4">Aulas</h2></div>

            {myclass.aulas && myclass.aulas.length > 0 ? (
                  myclass.aulas.map((aula: any, index:any) => (
                    <div key={aula.id} className="border border-gray-300 rounded-b-lg p-4 mb-4 bg-white">
                      <p className="text-gray-700 font-medium">Conteudo: <span className="font-normal">{aula.conteudo}</span></p>
                      <p className="text-gray-700 font-medium">link: <span className="font-normal">{aula.linkAtividade}</span></p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">F5</p>
                )}
            </div>
          </Link>


          <table className="min-w-full  border border-purple-700 rounded-sm">
              <thead className=''>
                <tr className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white'>
                  <th className="py-2 px-4 border-b text-left">Nome</th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className={`py-2 px-4 border-b text-left ${userRole === 'ROLE_ADMIN' ? '': 'hidden'}`}>Matrícula</th>
                  <th className={`py-2 px-4 border-b text-left ${userRole === 'ROLE_ADMIN' ? '': 'hidden'}`}>Pontuação</th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                {myclass?.students?.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-purple-100 cursor-pointer"
                    onClick={() => router.push(`/aluno/${student.id}`)}
                  >
                    <td className="py-2 px-4 border-b ">{student.name}</td>
                    <td className="py-2 px-4 border-b ">{student.email}</td>
                    <td className={`py-2 px-4 border-b ${userRole === 'ROLE_ADMIN' ? '': 'hidden'}`}>{student.registration}</td>
                    <td className={`py-2 px-4 border-b ${userRole === 'ROLE_ADMIN' ? '': 'hidden'}`}>{student.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </>
  );
}
