"use client"
import React, { useState, useEffect } from 'react';
import { fetchClient } from '@/app/services/fetchClient';
import Header from '@/app/(componentes)/Header';
import Aside from '@/app/(componentes)/Aside';
import { PiUsersFour } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiGoogleclassroom } from "react-icons/si";


function Page() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchClient("/myclassrooms");
        if (response.status === 200) {
          const data = await response.json();
          setData(data);
        } else {
          throw new Error('Falha na API');
        }
      } catch (error) {
        setError("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-2xl text-gray-500">Carregando...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500 text-2xl">{error}</div>;
  }

  return (
    <div className="bg-red-100 min-h-screen">
      <Header/>
      <div className='flex h-full'>
        <Aside/>
        <div className="flex-1 p-6 bg-custom-gradient">
          {data.length > 0 ? (
            data.map((item: any) => (
              <div key={item.id} className="bg-white shadow-md rounded-lg p-6 mb-6 bg-">
                <div className='bg-gradient-to-r from-[#e0eafc] via-[#cfdef3] to-[#93bed5] hover:bg-[#93bed5] p-4 rounded-md mb-3 border-l-4 border-[#5fcdee] cursor-pointer'>
                  <h2 className="text-2xl font-bold text-[#093248] mb-4">{item.name}</h2>
                  <p className="text-gray-700 mb-2"><strong>Trilha:</strong> {item.trilha}</p>
                  <p className="text-gray-700 mb-2"><strong>Semestre:</strong> {item.semester}</p>
                  <p className="text-gray-700 mb-2"><strong>Início:</strong> {item.datainicio}</p>
                  <p className="text-gray-700 mb-2"><strong>Fim:</strong> {item.datafim}</p>
                  <p className="text-gray-700 mb-4"><strong>Horário:</strong> {item.horario}</p>
                </div>

                {item.aulas && item.aulas.length > 0 && (
                  <div className="mb-4">
                    <div className='flex items-center gap-1 mb-3'>
                      <h3 className="text-xl font-semibold text-[#093248] ">Aulas </h3>
                      <h3><SiGoogleclassroom fill='#093248' size={18}/></h3>
                    </div>
                    {item.aulas.map((aula: any) => (
                      <div key={aula.id} className="bg-gradient-to-r from-[#e0eafc] via-[#cfdef3] to-[#93bed5] p-4 rounded-md mb-3 border-l-4 border-[#5fcdee] cursor-pointer">
                        <p className="text-gray-700"><strong>Conteúdo:</strong> {aula.conteudo}</p>
                        <p className="text-gray-700"><strong>Data:</strong> {aula.data}</p>
                        <a href={aula.linkAtividade} target='_blank' className="text-blue-500 underline">Atividade</a>
                      </div>
                    ))}
                  </div>
                )}

                {item.teachers && item.teachers.length > 0 && (
                  <div className="mb-4">
                    <div className='flex items-center gap-1 mb-3'>
                      <h3 className="text-xl font-semibold text-[#093248] ">Professor </h3>
                      <h3><LiaChalkboardTeacherSolid fill='#093248' size={20}/></h3>
                    </div>
                    {item.teachers.map((teacher: any) => (
                      <div key={teacher.id} className="bg-gradient-to-r from-[#e0eafc] via-[#cfdef3] to-[#93bed5] p-4 rounded-md mb-3 border-l-4 border-[#5fcdee] cursor-pointer">
                        <p className="text-gray-700"><strong>Nome:</strong> {teacher.name}</p>
                        <p className="text-gray-700"><strong>Email:</strong> {teacher.email}</p>
                        <p className="text-gray-700"><strong>Especialidade:</strong> {teacher.especialidade}</p>
                      </div>
                    ))}
                  </div>
                )}

                {item.students && item.students.length > 0 && (
                  <div>
                    <div className='flex items-center gap-1 mb-3'>
                      <h3 className="text-xl font-semibold text-[#093248] ">Membros </h3>
                      <h3><PiUsersFour fill='#093248' size={20}/></h3>
                    </div>
                    {item.students.map((student: any) => (
                      <div key={student.id} className="bg-gradient-to-r from-[#e0eafc] via-[#cfdef3] to-[#93bed5] p-4 rounded-md mb-3 border-l-4 border-[#5fcdee] cursor-pointer">
                        <p className="text-gray-700"><strong>Nome:</strong> {student.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhum dado disponível.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
