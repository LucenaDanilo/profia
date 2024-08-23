"use client"
import { useEffect, useState } from 'react'
import React from 'react'
import { fetchClient } from '@/app/services/fetchClient';
import { Student } from '@/types/Student';
import Aside from '@/app/(componentes)/Aside';
import Header from '@/app/(componentes)/Header';
import Image from 'next/image';

function Page({ params }: { params: { id: string } }) {
  const [aluno, setAluno] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true); 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Student | null>(null);
  const id = params.id;

  useEffect(() => {
    fetchClient(`http://192.168.15.6:8080/api/students/${id}`).then(async (response) => {
      if (response.status === 200) {
        const data = await response.json();
        setAluno(data);
        setFormData(data); // Inicializa formData com os dados do aluno
      }
      setLoading(false); 
    }).catch((error) => {
      console.error("Erro ao buscar a turma:", error);
      setLoading(false); 
    });
  }, [id]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // if (formData) {
    //   fetchClient(`http://192.168.15.6:8080/api/students/${id}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   }).then(response => {
    //     if (response.ok) {
    //       setAluno(formData); // Atualiza o aluno com os dados do formData
    //       setIsEditing(false);
    //     }
    //   }).catch(error => {
    //     console.error("Erro ao atualizar o aluno:", error);
    //   });
    // }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div>
      <Header/>
      <div className='flex'>
        <Aside/>
        {aluno ? (
          <div className='container mx-auto flex justify-center'>
            <div className="bg-white shadow-lg rounded-lg w-[80%] h-[auto] mt-6">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-400 h-[60px] rounded-t-lg w-full"></div>
              <div className='flex justify-between p-6'>
                <div className='flex'>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfaclSlk2r66bbWERGnl22DK3rzT3AKdtdMw&s" alt='buba' width={60} height={60} className='rounded-full p-1'/>
                  <div className='flex flex-col pl-3 pt-1'>
                    <span className='font-bold'>{aluno.name}</span>
                    <span className='text-gray-400'>{aluno.email}</span>
                  </div>
                </div>
                <div>
                  <button
                    onClick={isEditing ? handleSave : handleEditClick}
                    className='bg-blue-400 text-white rounded-md p-2 text-center w-[120px]'
                  >
                    {isEditing ? 'Salvar' : 'Editar'}
                  </button>
                </div>
              </div>
              <div className="p-6 grid grid-cols-2 gap-6 items-start">
                <div>
                  <div className="flex flex-col gap-0.5 mb-4">
                    <label className="font-semibold text-gray-600" htmlFor="name">Nome:</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800 w-full"
                      value={formData?.name || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 mb-4">
                    <label className="font-semibold text-gray-600" htmlFor="email">Email:</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800 w-full"
                      value={formData?.email || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 mb-4">
                    <label className="font-semibold text-gray-600" htmlFor="createdAt">Criado em:</label>
                    <input
                      id="createdAt"
                      name="createdAt"
                      type="text"
                      className="border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800 w-full"
                      value={formatDate(aluno.createdAt as string)}
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <div className="flex flex-col gap-0.5 mb-4">
                    <label className="font-semibold text-gray-600" htmlFor="birthday">Aniversário:</label>
                    <input
                      id="birthday"
                      name="birthday"
                      type="text"
                      className="border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800 w-full"
                      value={formatDate(aluno.birthday as string)}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 mb-4">
                    <label className="font-semibold text-gray-600" htmlFor="points">Pontos:</label>
                    <input
                      id="points"
                      name="points"
                      type="number"
                      className="border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800 w-full"
                      value={formData?.points || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 mb-4">
                    <label className="font-semibold text-gray-600" htmlFor="age">Idade:</label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      className="border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800 w-full"
                      value={formData?.age || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
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
    </div>
  );
}

export default Page;
