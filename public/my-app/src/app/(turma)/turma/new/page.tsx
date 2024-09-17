"use client"
import React from 'react'
import Header from '@/app/(componentes)/Header'
import Aside from '@/app/(componentes)/Aside'
import { fetchClient } from '@/app/services/fetchClient'
import { useEffect, useState } from 'react'

interface Teacher {
    id: string;
    name: string;
    especialidade: string;
  }
  
interface FormData {
    name: string;
    trilha: string;
    semester: string;
    level: string;
    datainicio: string;
    datafim: string;
    horario: string;
    teacherIds: string[];
}
function Page() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        trilha: '',
        semester: '',
        level: '',
        datainicio: '',
        datafim: '',
        horario: '',
        teacherIds: [], 
      });
    
      const [teachers, setTeachers] = useState<Teacher[]>([]);
      const fetchTeachers = async () => {
        try {
          const response = await fetchClient('/teachers');
          if (!response.ok) {
            throw new Error('Erro ao recuperar a lista de professores');
          }
          const data = await response.json();
          setTeachers(data);
        } catch (error) {
          console.error('Erro:', error);
        }
      };
    
      useEffect(() => {
        fetchTeachers();
      }, []);
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const handleTeacherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const selectedIds = selectedOptions.map(option => option.value);
        
        setFormData((prevData) => ({
          ...prevData,
          teacherIds: selectedIds
        }));
      };
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          const response = await fetchClient('/turmas', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error('Erro ao enviar o formulário');
          }
    
          setFormData({
            name: '',
            trilha: '',
            semester: '',
            level: '',
            datainicio: '',
            datafim: '',
            horario: '',
            teacherIds: [],
          });
    
          alert('Formulário enviado com sucesso!');
        } catch (error) {
          console.error('Erro:', error);
          alert('Houve um problema ao enviar o formulário.');
        }
      };

  return (
    <div className="custom-back min-h-screen">
      <Header />
      <div className="flex h-full">
        <Aside />
        <div className='mx-auto'>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-lg space-y-6">
                <h2 className="text-3xl font-bold mb-6 text-center">Create Turma</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-gray-700 font-bold mb-2">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter name"
                        required
                    />
                    </div>
                    
                    <div>
                    <label className="block text-gray-700 font-bold mb-2">Trilha</label>
                    <input 
                        type="text" 
                        name="trilha" 
                        value={formData.trilha} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter trilha"
                        required
                    />
                    </div>
                    
                    <div>
                    <label className="block text-gray-700 font-bold mb-2">Semester</label>
                    <input 
                        type="text" 
                        name="semester" 
                        value={formData.semester} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter semester"
                        required
                    />
                    </div>

                    <div>
                    <label className="block text-gray-700 font-bold mb-2">Level</label>
                    <input 
                        type="text" 
                        name="level" 
                        value={formData.level} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter level"
                        required
                    />
                    </div>
                    
                    <div>
                    <label className="block text-gray-700 font-bold mb-2">Data Inicio</label>
                    <input 
                        type="date" 
                        name="datainicio" 
                        value={formData.datainicio} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    </div>
                    
                    <div>
                    <label className="block text-gray-700 font-bold mb-2">Data Fim</label>
                    <input 
                        type="date" 
                        name="datafim" 
                        value={formData.datafim} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    </div>
                    
                    <div>
                    <label className="block text-gray-700 font-bold mb-2">Horário</label>
                    <input 
                        type="time" 
                        name="horario" 
                        value={formData.horario} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    </div>

                    <div className="col-span-2">
                    <label className="block text-gray-700 font-bold mb-2">Professores</label>
                    <select 
                        multiple 
                        name="teacherIds" 
                        value={formData.teacherIds} 
                        onChange={handleTeacherChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.name} - {teacher.especialidade}
                        </option>
                        ))}
                    </select>
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Create Turma
                </button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Page