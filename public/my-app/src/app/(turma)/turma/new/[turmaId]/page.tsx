"use client"
import React from 'react'
import Header from '@/app/(componentes)/Header'
import Dashboard from '@/app/(componentes)/Dash'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Link from 'next/link'

function page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        responsibleCPF: '',
        registration: '',
        birthday: '',
        turmaId: id || '' 
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        alert("Novo aluno cadastrado")
        console.log('Dados do aluno:', formData)
    }

    const handleCancel = () => {
        console.log('Desisti de criar')
        
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
                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Cadastrar novo aluno</h2>
                            <form onSubmit={handleCreateUser} method='POST'>
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="nome" required onChange={handleChange} />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="birthday" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Aniversário</label>
                                        <input type="text" name="birthday" id="birthday" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="01/01/2000" required onChange={handleChange} />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="responsibleCPF" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF Responsável</label>
                                        <input type="text" name="responsibleCPF" id="responsibleCPF" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="CPF do responsável" required onChange={handleChange} />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Email" required onChange={handleChange} />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="registration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Matrícula</label>
                                        <input type="text" name="registration" id="registration" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Matrícula" required onChange={handleChange} />
                                    </div>
                                    <div className="hidden">
                                        <label htmlFor="turmaId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Turma ID</label>
                                        <input type="text" name="turmaId" id="turmaId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formData.turmaId} readOnly />
                                    </div>
                                </div>
                                <div className='flex justify-around p-6'>
                                    <button type="submit" className='bg-green-400 p-2 rounded-md hover:bg-green-600'>Criar aluno</button>
                                    <button type="button" onClick={handleCancel} className='bg-yellow-400 p-2 rounded-md hover:bg-yellow-600'>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default page