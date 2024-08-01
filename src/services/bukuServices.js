import axios from "axios";

const api = 'http://localhost:3001/daftarBuku';

export const createBuku = async (data) => {
    try {
        const response = await axios.post(api, data);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const updateBuku = async (id, data) => {
    try {
        console.log(data);
        const response = await axios.put(`${api}/${id}`, data);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const fetchBuku = async () => {
    try {
        const response = await axios.get(api);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
