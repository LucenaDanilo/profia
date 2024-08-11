"use client"
import React from 'react';
import customSession from '../customHooks/customSession';
import { FaBook, FaClock, FaClipboardList, FaPenFancy } from 'react-icons/fa';
import ClassCard from './Card';

const UserProfile: React.FC = () => {
  const { sessionHook, loading } = customSession();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sessionHook) {
    return <div>No session found</div>;
  }

  const { user } = sessionHook;

  return (
    
    <main className="flex flex-wrap justify-center gap-6 md:gap-x-6 md:gap-y-2 mx-auto w-[90%] md:p-4">
        <ClassCard
        nome="Desenvolvimento Frontend"
        horario="sex 17h"
        professor="Sorak"
        descricao="Desenvolvimento web"
      />
      <ClassCard
        nome="Desenvolvimento Frontend"
        horario="sex 17h"
        professor="Danilo"
        descricao="Desenvolvimento de Jogos"
      />
      <ClassCard
        nome="Desenvolvimento Backend"
        horario="sex 17h"
        professor="Lucas Aielo"
        descricao="Desenvolvimento com java"
      />
        
  </main>
  );
};

export default UserProfile;