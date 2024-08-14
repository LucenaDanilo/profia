"use client"
import React from 'react';
import customSession from '../customHooks/customSession';
import { FaBook, FaClock, FaClipboardList, FaPenFancy } from 'react-icons/fa';
import ClassCard from './Card';
import Link from 'next/link';
const Dashboard: React.FC = () => {
  
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

export default Dashboard;