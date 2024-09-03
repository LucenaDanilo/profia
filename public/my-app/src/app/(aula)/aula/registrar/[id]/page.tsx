"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { fetchClient } from '@/app/services/fetchClient';
import { Student } from '@/types/Student';
import Header from '@/app/(componentes)/Header';
import Aside from '@/app/(componentes)/Aside';

function Page({ params }: { params: { id: string } }) {
  const idTurma = params.id;
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkAtividade, setLinkAtividade] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [data, setData] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await fetchClient(`/turmas/${idTurma}`);
        if (response.status === 200) {
          const data = await response.json();
          const studentData = data.students.map((student: Student) => ({
            id: student.id,
            name: student.name
          }));
          setStudents(studentData);
        } else {
          throw new Error('Falha na API');
        }
      } catch (error) {
        console.error('Erro ao resgatar os dados dos alunos:', error);
      }
    };
    
    getStudents();
  }, [idTurma]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async () => {
    const studentIds = students.map(student => student.id);
    const professorId = session?.user.id;
    const turmaId = idTurma;

    try {
      const response = await fetchClient('/aula/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conteudo, 
          turmaId,
          professorId,
          studentIds,
          data,
          linkAtividade
        }),
      });

      if (response.ok) {
        alert('Aula registrada com sucesso');
        handleCloseModal();
      } else {
        throw new Error('Falha ao registrar a aula');
      }
    } catch (error) {
      console.error('Erro ao registrar a aula:', error);
      alert('Erro ao registrar a aula');
    }
  };

  return (
    <div>
      <Header />
      <div className='flex h-full'>
        <Aside />
        <div className="p-6 bg-custom-gradient mx-auto flex-1">
          <div className='bg-white flex flex-col  justify-center items-center w-[350px] rounded-lg p-4 mx-auto'>
            <h2 className="text-xl mb-4">Olá, {session?.user.name}</h2>
            <h1 className="text-2xl font-bold mb-4">Cadastre uma nova atividade para sua turma</h1>
            <button
              onClick={handleOpenModal}
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
            >
              Cadastrar Aula
            </button>

          </div>
          
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-6">Cadastrar Nova Aula</h2>
                <label className="block mb-4">
                  <span className="text-gray-700 text-sm font-medium">Conteúdo</span>
                  <input
                    type="text"
                    value={conteudo}
                    onChange={(e) => setConteudo(e.target.value)}
                    className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-700 text-sm font-medium">Link da Atividade</span>
                  <input
                    type="text"
                    value={linkAtividade}
                    onChange={(e) => setLinkAtividade(e.target.value)}
                    className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
                <label className="block mb-6">
                  <span className="text-gray-700 text-sm font-medium">Data</span>
                  <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </label>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow-md hover:bg-gray-400 transition"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Alunos</h3>
            {students.length > 0 ? (
              <table className=" min-w-full divide-y divide-gray-200 border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.id ? student.id.split('-')[0]: ''}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Nenhum aluno encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
