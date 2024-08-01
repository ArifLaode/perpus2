import axios from "axios";

const api = 'http://localhost:3001/daftarAnggota';

export const createAnggota = async (data) => {
    try {
        console.log("Sending data to create anggota:", data);
        const response = await axios.post(api, data);
        console.log("Response from server:", response.data);
        return response.data;
    } catch (error) {
        console.error("Ada kesalahan dalam menambahkan Anggota ", error);
        throw error;
    }
}

export const updateAnggota = async (id, data) => {
    try {
        console.log("Sending data to update anggota:", data, "with id:", id);
        const response = await axios.put(`${api}/${id}`, data);
        console.log("Response from server:", response.data);
        return response.data;
    } catch (error) {
        console.error("Ada kesalahan dalam mengupdate Anggota ", error);
        throw error;
    }
}

