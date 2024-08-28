import React from 'react';
import Header from '@/app/(componentes)/Header';
import Aside from '@/app/(componentes)/Aside';

const StudentHistory = () => {
  const aulas = [
    { id: 1, name: 'Lógica de Programação', date: '2024-08-15', status: 'Concluída' },
    { id: 2, name: 'Utilização de condicionais', date: '2024-08-16', status: 'Concluída' },
  ];

  const presenca = [
    { id: 1, date: '2024-08-15', status: 'Presente' },
    { id: 2, date: '2024-08-16', status: 'Ausente' },
  ];

  const produtosResgatados = [
    { id: 1, product: 'Item 01', date: '2024-08-15' },
    { id: 2, product: 'Item 02', date: '2024-08-16' },
  ];

  return (
    <div>
      <Header/>
      <div className='flex h-full'>
        <Aside/>
        <div className="flex flex-col md:flex gap-4 md:flex-wrap w-full p-8 bg-black">
          <div className='flex-1 bg-[#4ED7E3] p-4 rounded shadow'>
            <h2 className="text-xl font-semibold mb-4">Histórico de Aulas</h2>
            <div className="space-y-4">
              {aulas.map((lesson) => (
                <div key={lesson.id} className="bg-white p-4 h-[110px] rounded shadow hover:bg-gray-300 cursor-pointer">
                  <h3 className="font-bold text-lg">{lesson.name}</h3>
                  <p>Data: {lesson.date}</p>
                  <p>Status: <span className={lesson.status === 'Concluída' ? 'text-green-500' : 'text-red-500'}>{lesson.status}</span></p>
                </div>
              ))}
            </div>
          </div>
          <div className='flex-1 bg-[#4ED7E3] p-4 rounded shadow'>
            <h2 className="text-xl font-semibold mb-4">Histórico de Presença</h2>
            <div className="space-y-4">
              {presenca.map((record) => (
                <div key={record.id} className="bg-white p-4 h-[110px] rounded shadow hover:bg-gray-300 cursor-pointer">
                  <p>Data: {record.date}</p>
                  <p>Status: <span className={record.status === 'Presente' ? 'text-green-500' : 'text-red-500'}>{record.status}</span></p>
                </div>
              ))}
            </div>
          </div>
        
          <div className='flex-1 bg-[#4ED7E3] p-4 rounded shadow'>
            <h2 className="text-xl font-semibold mb-4">Histórico de Produtos comprados recentemente</h2>
            <div className="space-y-4">
              {produtosResgatados.map((product) => (
                <div key={product.id} className="bg-white p-4 h-[110px]  rounded shadow hover:bg-gray-300 cursor-pointer">
                  <p>Produto: {product.product}</p>
                  <p>Data: {product.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHistory;
