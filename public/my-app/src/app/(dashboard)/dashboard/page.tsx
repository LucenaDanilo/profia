import React from 'react'
import Header from '@/app/(componentes)/Header'
import Aside from '@/app/(componentes)/Aside'
import Dash from '@/app/(componentes)/Dash'


export default async function page() {
  return (
    <div className="bg-[#28272bf1] min-h-screen">
      <Header />
      <div className="flex h-full">
        <Aside />
        <div className="p-8 space-y-8">
      {/* Menu Principal */}
      <nav className="bg-gray-800 text-white p-4 rounded shadow">
        <ul className="flex space-x-4">
          <li><a href="/dashboard" className="hover:text-gray-400">Dashboard</a></li>
          <li><a href="/classes" className="hover:text-gray-400">Aulas</a></li>
          <li><a href="/students" className="hover:text-gray-400">Alunos</a></li>
          <li><a href="/grades" className="hover:text-gray-400">Notas</a></li>
          <li><a href="/reports" className="hover:text-gray-400">Relatórios</a></li>
        </ul>
      </nav>

      {/* Resumo Rápido */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Visão Geral</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Total de Alunos</h3>
            <p className="text-2xl font-bold">120</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Aulas Agendadas</h3>
            <p className="text-2xl font-bold">25</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Tarefas Pendentes</h3>
            <p className="text-2xl font-bold">8</p>
          </div>
        </div>
      </div>

      {/* Calendário e Eventos */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Calendário de Aulas</h2>
        <div className="bg-gray-200 p-4 rounded">
          {/* Integrar um calendário aqui */}
          <p>Calendário de aulas e eventos aqui.</p>
        </div>
      </div>

      {/* Tarefas e Atividades */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Tarefas e Atividades</h2>
        <div className="space-y-4">
          {/* Adicionar tarefas e atividades aqui */}
          <div className="bg-blue-50 p-4 rounded shadow">
            <h3 className="font-semibold">Tarefa 1</h3>
            <p>Descrição da tarefa.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded shadow">
            <h3 className="font-semibold">Atividade 2</h3>
            <p>Descrição da atividade.</p>
          </div>
        </div>
      </div>

      {/* Notícias e Atualizações */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Notícias e Atualizações</h2>
        <div className="space-y-4">
          {/* Adicionar notícias e atualizações aqui */}
          <div className="bg-yellow-50 p-4 rounded shadow">
            <h3 className="font-semibold">Notícia 1</h3>
            <p>Descrição da notícia ou atualização.</p>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  )
}

