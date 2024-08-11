"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'


interface UserOwn {
    name: String | undefined;
    email: String | undefined;
    id: String | undefined;
}

function UpdateExam() {
    const [title, setTitle] = useState("");
    const [comentario, setComentario] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const submitFile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("comentario", comentario);
        formData.append("file", file as Blob);

        console.log(title, comentario, file);

        try {
            // const responseFile = await axiosFetch.post("/send", formData, {
            //     headers: { "Content-Type": "multipart/form-data" }
            // });
        
            // console.log(responseFile);
            // setTitle("");
            // setComentario("");
            // setFile(null);
        
            // alert("Arquivo enviado com sucesso!");
            // router.replace('/turma')
        } catch (error) {
            // console.error("Erro ao enviar arquivo:", error);
            // alert("Você não pode enviar duas vezes o mesmo documento.");
            // setTitle("");
            // setComentario("");
            // setFile(null);
        }
    };

    return (
        <div className="bg-[#f4f4f4ea] p-8 rounded-lg shadow-lg w-[400px] max-w-md mx-auto mt-6">
            <form className="flex flex-col gap-4" onSubmit={submitFile}>
                <h5 className="text-lg text-center font-bold mb-2">Envie seu PDF</h5>
                <input
                    type="text"
                    placeholder="Título"
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Assunto"
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                />
                <input
                    type="file"
                    accept="application/pdf"
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleFileChange}
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Enviar</button>
            </form>
        </div>
    );
}

export default UpdateExam;