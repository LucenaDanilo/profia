"use client";
import React, { useState } from 'react';
import Header from '@/app/(componentes)/Header';
import Aside from '@/app/(componentes)/Aside';
import { fetchClient } from '@/app/services/fetchClient';

function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const [studentId] = useState(id); 
  const [points, setPoints] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pointsDto = {
      studentId: studentId,
      points: parseInt(points, 10),
    };

    try {
      const response = await fetchClient('/students/coins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pointsDto),
      });

      if (response.ok) {
        setMessage('Pontos atribuídos com sucesso!');
      } else {
        setMessage('Erro ao atribuir pontos.');
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      setMessage('Erro ao atribuir pontos.');
    }
  };

  return (
    <div className="bg-[#28272bf1] min-h-screen">
      <Header />
      <div className="flex h-full">
        <Aside />
        <div className="flex-1 p-6">
          <h1 className="text-white mb-4">Atribuir Moedas ao Aluno</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white">ID do Aluno</label>
              <input
                type="text"
                value={studentId}
                className="p-2 rounded border w-full"
                placeholder="ID do aluno"
                required
                disabled
              />
            </div>
            <div>
              <label className="block text-white">Quantidade de Pontos</label>
              <input
                type="number"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="p-2 rounded border w-full"
                placeholder="Digite a quantidade de pontos"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Atribuir Pontos
            </button>
          </form>
          {message && <p className="text-white mt-4">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Page;
