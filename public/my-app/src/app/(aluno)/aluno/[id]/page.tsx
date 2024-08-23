"use client"
import { useEffect, useState } from 'react'
import React from 'react'
import { fetchClient } from '@/app/services/fetchClient';
import { Student } from '@/types/Student';

function Page({ params }: { params: { id: string } }) {
  const [aluno, setAluno] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true); 
  const id = params.id;

  useEffect(() => {
    fetchClient(`http://192.168.15.6:8080/api/students/${id}`).then(async (response) => {
      if (response.status === 200) {
        const data = await response.json();
        setAluno(data);
      }
      setLoading(false); 
    }).catch((error) => {
      console.error("Erro ao buscar a turma:", error);
      setLoading(false); 
    });
  }, [id]);

  const formatDate = (dateString: string ) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      {aluno ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-lg">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Informações do Aluno</h1>
            <div className="grid grid-cols-1 gap-y-4">
              <div className="flex items-center">
                <span className="font-semibold w-1/3 text-gray-600">Nome:</span>
                <span className="w-2/3 text-gray-800">{aluno.name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-1/3 text-gray-600">Email:</span>
                <span className="w-2/3 text-gray-800">{aluno.email}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-1/3 text-gray-600">Criado em:</span>
                <span className="w-2/3 text-gray-800">{formatDate(aluno.createdAt as string)}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-1/3 text-gray-600">Aniversário:</span>
                <span className="w-2/3 text-gray-800">{formatDate(aluno.birthday as string)}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-1/3 text-gray-600">Pontos:</span>
                <span className="w-2/3 text-gray-800">{aluno.points}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-1/3 text-gray-600">Idade:</span>
                <span className="w-2/3 text-gray-800">{aluno.age} anos</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-800">Aluno não encontrado.</p>
        </div>
      )}
    </div>
  );
}

export default Page;
