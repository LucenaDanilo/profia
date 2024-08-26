"use client"
import React, { useState } from 'react'
import Header from '@/app/(componentes)/Header'
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Link from 'next/link'
import { fetchClient } from '@/app/services/fetchClient';
import { getCookie } from 'cookies-next';
function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    console.log('meu id', id)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        responsibleCPF: '',
        registration: '',
        birthday: '',
        turmaId: id || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("tentando cadastrar", formData)
        try {
            const response = await fetchClient('http://192.168.15.6:8080/auth/student/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar o aluno');
            }

            const data = await response.json();
            console.log('Aluno cadastrado com sucesso:', data);

            setFormData({
                name: '',
                email: '',
                responsibleCPF: '',
                registration: '',
                birthday: '',
                turmaId: formData.turmaId 
            });

        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <>
            <Header />
            <div className='flex justify-center mt-4'>
                <section className="dark:bg-gray-900 rounded-lg shadow-lg">
                    <div className="py-8 px-4 mx-auto max-w-2xl">
                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Cadastrar novo aluno</h2>
                        <form className="max-w-md mx-auto md:w-[800px]" onSubmit={handleCreateUser} method='POST'>
                            <div className="relative z-0 w-full mb-5 group">
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder=" " 
                                    required 
                                />
                                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Nome do aluno
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder=" " 
                                    required 
                                />
                                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Email do aluno
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input 
                                    type="text" 
                                    name="responsibleCPF" 
                                    id="responsibleCPF" 
                                    value={formData.responsibleCPF} 
                                    onChange={handleChange} 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder=" " 
                                    required 
                                />
                                <label htmlFor="responsibleCPF" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    CPF do Responsável
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input 
                                    type="text" 
                                    name="registration" 
                                    id="registration" 
                                    value={formData.registration} 
                                    onChange={handleChange} 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder=" " 
                                    required 
                                />
                                <label htmlFor="registration" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Data de cadastro
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input 
                                    type="text" 
                                    name="birthday" 
                                    id="birthday" 
                                    value={formData.birthday} 
                                    onChange={handleChange} 
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder=" " 
                                    required 
                                />
                                <label htmlFor="birthday" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Aniversário
                                </label>
                            </div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastrar</button>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Page;
