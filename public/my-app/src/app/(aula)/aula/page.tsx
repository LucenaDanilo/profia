"use client"
import React, { useState, useEffect } from 'react';
import { fetchClient } from '@/app/services/fetchClient';
import Header from '@/app/(componentes)/Header';
import Aside from '@/app/(componentes)/Aside';
function Page() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchClient("http://192.168.15.6:8080/myclassrooms");
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
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header/>
      <div className='flex h-full'>
        <Aside/>
        {data.length > 0 ? (
        data.map((item: any) => (
          <div key={item.id} className="border border-gray-300 rounded-md p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p><strong>Trilha:</strong> {item.trilha}</p>
            <p><strong>Semestre:</strong> {item.semester}</p>
            <p><strong>Início:</strong> {item.datainicio}</p>
            <p><strong>Fim:</strong> {item.datafim}</p>
            <p><strong>Horário:</strong> {item.horario}</p>

            {item.aulas && item.aulas.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mt-4">Aulas</h3>
                {item.aulas.map((aula: any) => (
                  <div key={aula.id} className="border border-gray-200 rounded-md p-4 mb-2">
                    <p><strong>Conteúdo:</strong> {aula.conteudo}</p>
                    <p><strong>Data:</strong> {aula.data}</p>
                    <a href={aula.linkAtividade} className="text-blue-500 underline">Atividade</a>
                  </div>
                ))}
              </div>
            )}

            {item.teachers && item.teachers.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mt-4">Professores</h3>
                {item.teachers.map((teacher: any) => (
                  <div key={teacher.id} className="border border-gray-200 rounded-md p-4 mb-2">
                    <p><strong>Nome:</strong> {teacher.name}</p>
                    <p><strong>Email:</strong> {teacher.email}</p>
                    <p><strong>Especialidade:</strong> {teacher.especialidade}</p>
                  </div>
                ))}
              </div>
            )}

            {item.students && item.students.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mt-4">Alunos</h3>
                {item.students.map((student: any) => (
                  <div key={student.id} className="border border-gray-200 rounded-md p-4 mb-2">
                    <p><strong>Nome:</strong> {student.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Nenhum dado disponível.</p>
      )}
      </div>
      
    </div>
  );
}

export default Page;
