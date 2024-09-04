"use client";
import { useEffect, useState } from 'react';
import { fetchClient } from '@/app/services/fetchClient';
import { Student } from '@/types/Student';
import Aside from '@/app/(componentes)/Aside';
import Header from '@/app/(componentes)/Header';
import Image from 'next/image';

export interface CustomUser{
  name: string | null,
  email: string | null,
  password: string | null,
  responsibleCPF: string | null,
  registration: string | null,
  birthday: null,
  points: number
} 
function Page({ params }: { params: { id: string } }) {
  const [aluno, setAluno] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true); 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CustomUser | null>(null);
  const id = params.id;

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const response = await fetchClient(`/students/${id}`);
        if (response.status === 200) {
          const data = await response.json();
          setAluno(data);
          setFormData(data);
        } else {
          console.error(`Erro ao buscar o aluno: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Erro ao buscar o aluno:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAluno();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (formData) {
      console.log(formData)
      try {
        const response = await fetchClient(`/students/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setAluno(formData); 
          setIsEditing(false);
        } else {
          console.error(`Erro ao atualizar o aluno: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Erro ao atualizar o aluno:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!aluno) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Aluno não encontrado</p>
      </div>
    );
  }

  return (
    <div>
      <Header/>
      <div className='flex'>
        <Aside/>
       
        <div className='container mx-auto flex justify-center'>
          <div className="bg-white shadow-lg rounded-lg w-[80%] h-[auto] mt-6">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-400 h-[60px] rounded-t-lg w-full"></div>
            <div className='flex justify-between p-6'>
              <div className='flex'>
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfaclSlk2r66bbWERGnl22DK3rzT3AKdtdMw&s" loading='lazy' alt='buba' width={60} height={60} className='rounded-full p-1'/>
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
                  <label className="font-semibold text-gray-600" htmlFor="password">Senha:</label>
                  <input
                    id="password"
                    name="password"
                    type="text"
                    className="border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800 w-full"
                    value={formData?.password?.substring(0,10) || ''}
                    disabled
                  />
                </div>
                <div className="flex flex-col gap-0.5 mb-4">
                  <label className="font-semibold text-gray-600" htmlFor="responsibleCPF">CPF:</label>
                  <input
                    id="responsibleCPF"
                    name="responsibleCPF"
                    type="text"
                    className="border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800 w-full"
                    value={formData?.responsibleCPF || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-0.5 mb-4">
                  <label className="font-semibold text-gray-600" htmlFor="registration">Registro:</label>
                  <input
                    id="registration"
                    name="registration"
                    type="text"
                    className="border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800 w-full"
                    value={formData?.registration || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex flex-col gap-0.5 mb-4">
                  <label className="font-semibold text-gray-600" htmlFor="birthday">Aniversário:</label>
                  <input
                    id="birthday"
                    name="birthday"
                    type="text" 
                    className="border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800 w-full"
                    value={formData?.birthday || ''}
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
                <div className='bg-red-300 w-[120px] h-[120px]'>
                

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
