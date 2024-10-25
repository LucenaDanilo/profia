"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/app/(componentes)/Header';
import { useRouter } from 'next/navigation';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Link from 'next/link';
import { fetchClient } from "@/app/services/fetchClient";

function TeacherPage() {
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cnpj, setCnpj] = useState<string>("");
    const [hrAula, setHrAula] = useState<number>(0);
    const [especialidade, setEspecialidade] = useState<string>("");
    const [turmaIds, setTurmaIds] = useState<string[]>([]);
    const [turmas, setTurmas] = useState<{ id: string, name: string }[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const fetchTurmas = async () => {
        try {
            const response = await fetchClient('/turmas');
            if (!response.ok) {
                throw new Error('Erro ao recuperar a lista de turmas');
            }
            const data = await response.json();
            setTurmas(data);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        fetchTurmas();
    }, []);

    const handleCreateTeacher = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
            name,
            email,
            password,
            cnpj,
            hrAula,
            especialidade,
            turmaIds 
        };

        try {
            const response = await fetchClient('/auth/teacher/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar o professor');
            }

            const data = await response.json();
            setSuccessMessage('Professor cadastrado com sucesso!');
            setErrorMessage(""); 

         
            setName("");
            setEmail(""); 
            setPassword(""); 
            setCnpj("");
            setHrAula(0);
            setEspecialidade("");
            setTurmaIds([]);

        } catch (error) {
            setErrorMessage('Erro ao cadastrar o professor.');
            setSuccessMessage(""); 
            console.error('Erro:', error);
        }
    };

    const handleCancel = () => {
        console.log('Desisti de criar');
        router.push("/turma");
    }

    return (
        <>
            <Header />
            <div className='flex justify-center'>
                <Link href="/turma" className='pr-6 pt-6 flex flex-col items-center cursor-pointer'>
                    <FaArrowAltCircleLeft size={22} color='#c4c4c4' />
                    <span className='pl-2'>voltar</span>
                </Link>
                <div className='flex justify-center items-center bg-blue-300'>
                    <section className="bg-white dark:bg-gray-900">
                        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Cadastrar novo professor</h2>
                            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                            {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
                            <form onSubmit={handleCreateTeacher} method='POST'>
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Nome"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Email"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Senha"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="cnpj" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CNPJ</label>
                                        <input
                                            type="text"
                                            name="cnpj"
                                            id="cnpj"
                                            value={cnpj}
                                            onChange={(e) => setCnpj(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="CNPJ"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="hrAula" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hora/Aula</label>
                                        <input
                                            type="number"
                                            name="hrAula"
                                            id="hrAula"
                                            value={hrAula}
                                            onChange={(e) => setHrAula(parseFloat(e.target.value))}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Horas por Aula"
                                            step="0.01"
                                            min="0"
                                            required
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="especialidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Especialidade</label>
                                        <input
                                            type="text"
                                            name="especialidade"
                                            id="especialidade"
                                            value={especialidade}
                                            onChange={(e) => setEspecialidade(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Especialidade"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="turmaIds" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Turmas</label>
                                        <select
                                            multiple
                                            id="turmaIds"
                                            value={turmaIds}
                                            onChange={(e) => setTurmaIds(Array.from(e.target.selectedOptions, option => option.value))}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        >
                                            {turmas.map(turma => (
                                                <option key={turma.id} value={turma.id}>
                                                    {turma.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='flex justify-around p-6'>
                                    <button type="submit" className='bg-green-400 p-2 rounded-md hover:bg-green-600'>Criar professor</button>
                                    <button type="button" onClick={handleCancel} className='bg-yellow-400 p-2 rounded-md hover:bg-yellow-600'>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default TeacherPage;
