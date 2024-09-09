"use client"
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Header from '@/app/(componentes)/Header'; 
import Aside from '@/app/(componentes)/Aside';  // Ajuste o caminho conforme necessário

function Page() {
  const { data: session } = useSession();
  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <div className="bg-custom-gradient min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        <Aside />
        <div className="p-6 mx-[20px] bg-blue-300 rounded-lg shadow-lg h-[345px] text-white mt-6 w-[90%]">
          <h1 className="text-3xl font-bold mb-4 text-black">Olá, <p className='text-white'>{session?.user.name}</p></h1>
          <h2 className="text-xl font-semibold mb-2 text-black">Esses são seus pontos: <span className="font-bold text-yellow-100">{session?.user.points}</span></h2>
          <h3 className="text-lg font-medium text-black">Consulte a coordenação para verificar como ganhar mais pontos</h3>
        </div>
      </div>
    </div>
  );
}

export default Page;