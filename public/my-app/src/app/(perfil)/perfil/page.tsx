"use client";
import { useEffect, useState } from 'react';
import { fetchClient } from '@/app/services/fetchClient';
import Header from '@/app/(componentes)/Header';
import Aside from '@/app/(componentes)/Aside';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
interface User {
  name: string;
  email: string;
  password: string;
  responsibleCPF: string;
  birthday: string; 
}

function EditProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { data: session, update } = useSession();

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };
  const id = session?.user.id;

  useEffect(() => {
    if (session?.user) {
      const formattedBirthday = formatISOToDate(session.user.birthday || '');
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        password: '', 
        responsibleCPF: applyCpfMask(session.user.responsibleCPF || ''), // Aplica a máscara para exibição
        birthday: formattedBirthday,
      });
    }
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'responsibleCPF') {
      setFormData(prev => prev ? { ...prev, [name]: applyCpfMask(value) } : null);
    } else if (name === 'birthday') {
      setFormData(prev => prev ? { ...prev, [name]: value } : null); 
    } else {
      setFormData(prev => prev ? { ...prev, [name]: value } : null);
    }
  };

  const applyCpfMask = (value: string): string => {
    const cleaned = value.replace(/\D+/g, ''); 
    if (cleaned.length <= 11) {
      return cleaned
        .replace(/^(\d{3})(\d{3})/, '$1.$2.')
        .replace(/\.(\d{3})(\d{1,2})/, '.$1-$2');
    }
    return cleaned;
  };

  const removeCpfMask = (value: string): string => {
    return value.replace(/\D+/g, ''); 
  };

  const formatDateToISO = (value: string): string => {
    const [day, month, year] = value.split('/').map(Number);
    if (year && month && day) {
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
    return '';
  };

  const formatISOToDate = (value: string): string => {
    const [year, month, day] = value.split('-').map(Number);
    if (year && month && day) {
      return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    }
    return '';
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (formData) {
      setErrors({});
  
      if (!formData.password) {
        setErrors(prev => ({ ...prev, password: 'Password is required' }));
        return;
      }
  
      const cleanedCPF = removeCpfMask(formData.responsibleCPF); // Remove a máscara antes de enviar
  
      try {
        const response = await fetchClient(`/students/myprofile/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            responsibleCPF: cleanedCPF,  
            birthday: formatDateToISO(formData.birthday || '')
          }),
        });
  
        if (response.ok) {
          await update({ 
            user: { 
              ...session?.user, 
              name: formData.name, 
              email: formData.email,
              responsibleCPF: cleanedCPF,
              birthday: formData.birthday,
            } 
          });
          reloadSession();
          setIsEditing(false);
        } else {
          console.error(`Error updating user: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  if (!formData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex lg:flex-row">
        <Aside />
        <div className="container mx-auto flex justify-center px-4 lg:px-0">
          <div className="bg-white shadow-lg rounded-lg w-full lg:w-[80%] h-auto mt-6">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-400 h-[60px] rounded-t-lg w-full"></div>
            <div className="flex flex-col sm:flex-row justify-between p-6">
              <div className="flex items-center mb-4 sm:mb-0">
                <Image
                  src="/Robo.jpg"
                  alt="Profile"
                  width={60}
                  height={60}
                  className="rounded-full p-1"
                />
                <div className="flex flex-col pl-3 pt-1">
                  <span className="font-bold text-lg">{formData.name}</span>
                  <span className="text-gray-400">{formData.email}</span>
                </div>
              </div>
              <div className="flex justify-center sm:justify-end">
                <button
                  onClick={isEditing ? handleSave : handleEditClick}
                  className="bg-blue-400 text-white rounded-md p-2 text-center w-[120px]"
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div>
                <div className="flex flex-col gap-0.5 mb-4">
                  <label className="font-semibold text-gray-600" htmlFor="name">
                    Name:
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800 w-full"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex flex-col gap-0.5 mb-4">
                  <label className="font-semibold text-gray-600" htmlFor="email">
                    Email:
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800 w-full"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex flex-col gap-0.5 mb-4">
                  <label className="font-semibold text-gray-600" htmlFor="password">
                    Password:
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={`border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800 w-full ${errors.password ? "border-red-500" : ""}`}
                    value={formData.password || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm">{errors.password}</span>
                  )}
                </div>
                <div className="flex flex-col gap-0.5 mb-4">
                  <label className="font-semibold text-gray-600" htmlFor="responsibleCPF">
                    CPF:
                  </label>
                  <input
                    id="responsibleCPF"
                    name="responsibleCPF"
                    type="text"
                    className="border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800 w-full"
                    value={formData.responsibleCPF || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-0.5 mb-4">
                  <label className="font-semibold text-gray-600" htmlFor="birthday">
                    Birthday:
                  </label>
                  <input
                    id="birthday"
                    name="birthday"
                    type="text"
                    className="border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-800 w-full"
                    value={formData.birthday || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
