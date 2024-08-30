import React from 'react'
import Header from '@/app/(componentes)/Header'
import Aside from '@/app/(componentes)/Aside'
function page() {
  return (
    <>
      <Header/>
      <div className='flex h-[100vh]'>
      <Aside/>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
  <div className="flex items-center space-x-6 mb-4">
    <img className="h-20 w-20 object-cover rounded-full" src="profile.jpg" alt="Profile Image"/>
    <div>
      <h2 className="text-xl font-semibold">Nome do Usuário</h2>
      <p className="text-gray-600">joao@silvinha@gmail.com</p>
    </div>
  </div>

  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-medium">Sobre Mim</h3>
      <p className="text-gray-700">Breve descrição ou biografia do usuário.</p>
    </div>

    <div>
      <h3 className="text-lg font-medium">Informações Pessoais</h3>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>Data de Nascimento: 01/01/1990</li>
        <li>Endereço: Rua Exemplo, 123, Cidade</li>
        <li>Telefone: (11) 1234-5678</li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-medium">Configurações da Conta</h3>
      <button className="bg-blue-500 text-white py-2 px-4 rounded">Alterar Senha</button>
    </div>

    <div>
      <h3 className="text-lg font-medium">Preferências</h3>
      <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded">Tema Claro/Escuro</button>
    </div>

    <div className="flex justify-end">
      <button className="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
    </div>
  </div>
</div>

      </div>
    </>
  )
}

export default page