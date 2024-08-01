import axios from "axios";

const api = 'http://localhost:3001/daftarPeminjam';

export const createPeminjam = async (data) => {
    try {
        const response = await axios.post(api, data);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const updatePeminjam = async (id, data) => {
    try {
        console.log(data);
        const response = await axios.put(`${api}/${id}`, data);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const fetchPeminjam = async () => {
    try {
        const response = await axios.get(api);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const deletePeminjam = async (id) => {
    try {
        const response = await axios.delete(`${api}/${id}`);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}