"use client"
import { useEffect, useState } from 'react'
import React from 'react'
import { fetchClient } from '@/app/services/fetchClient';
import { Student } from '@/types/Student';
function page({ params }: { params: { id: String } }) {
  const [aluno,setAluno] = useState<Student>()
  const [loading, setLoading] = useState(true); 
  const id = params.id;
  console.log(id)
  
  useEffect(() => {
    fetchClient(`http://192.168.15.9:8080/api/students/${id}`).then(async (response) => {
      if (response.status === 200) {
        const data = await response.json();
        setAluno(data);
      }
      setLoading(false); 
    }).catch((error) => {
      console.error("Erro ao buscar a turma:", error);
      setLoading(false); 
    });
  }, []);
  console.log(aluno)
  return (
    <div>minha pagina de aluno informações: {id}</div>
  )
}

export default page