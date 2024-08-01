import React, { useState, useEffect } from "react";
import Navbar from "./Compenent/Navbar";
import { Button, Col, Form, Modal, Row, Alert } from 'react-bootstrap';
import { createAnggota, updateAnggota } from "./services/anggotaServices";

function DaftarAnggota() {
    const [show, setShow] = useState(false);    
    const [anggotalist, setAnggotalist] = useState([]);
    const [nama, setNama] = useState('');
    const [alamat, setAlamat] = useState('');
    const [telepon, setTelepon] = useState('');
    const [validated, setValidated] = useState(false);
    const [editingAnggota, setEditingAnggota] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleShow = (anggota = null) => {
        if (anggota) {
            setEditingAnggota(anggota.id_anggota);
            setNama(anggota.nama);
            setAlamat(anggota.alamat);
            setTelepon(anggota.nomor);
        } else {
            setEditingAnggota(null);
            setNama('');
            setAlamat('');
            setTelepon('');
        }
        setShow(true);
    };
    const handleClose = () => {
        setShow(false);
        setValidated(false);
    };

    const fetchanggotalist = async () => {
        try {
            const response = await fetch('http://localhost:3001/daftarAnggota');
            if (!response.ok) {
                throw new Error(response.status);
            }
            const data = await response.json();
            setAnggotalist(data);
        } catch (er) {
            console.error('Kesalahan dalam fetch data ', er);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (!editingAnggota && form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            const newAnggota = { nama, alamat, nomor: telepon };
            try {
                if (editingAnggota) {
                    await updateAnggota(editingAnggota, newAnggota);
                } else {
                    await createAnggota(newAnggota);
                }
                setNama('');
                setAlamat('');
                setTelepon('');
                handleClose();
                fetchanggotalist();
            } catch (er) {
                console.error("failed to create new anggota", er);
                setErrorMessage(er.response?.data.message || er.message || 'terjadi kesalahan');
            }
        }

        if (!editingAnggota) {
            setValidated(true);
        }
    }

    useEffect(() => {
        fetchanggotalist();
    }, []);

    return(
        <div>
            <Navbar />
            <div className="container">
            <h1 className="mt-5">Daftar Nama Anggota Peminjam</h1>
            <p className="text-center mt-5">Berikut adalah daftar nama-nama Angoota Peminjam Buku</p>
            <div className="container-fluid">
                <div className="col-md5">
                    <div className="table-responsive">
                       <table className="table table-striped">
                        <thead className="thead-primary">
                            <tr>
                                <th>ID Anggota</th>
                                <th>Nama</th>
                                <th>Alamat</th>
                                <th>Nomor Telepon</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                        {anggotalist.map((anggota, index) => (
                        <tr key={anggota.id_anggota}>
                            <th scope="row">{anggota.id_anggota}</th>
                                <td>{anggota.nama}</td>
                                <td>{anggota.alamat}</td>
                                <td>{anggota.nomor}</td>
                                <td>
                                    <Button 
                                        type="button" 
                                        className="btn btn-success" 
                                        title="Edit" 
                                        onClick={() => handleShow(anggota)}
                                    >
                                        <i className="fas fa-pencil"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4}></td>
                                <td><button type="button" className="btn btn-primary" onClick={() => handleShow()}>
                                        <i className="fas fa-plus"></i>
                                    </button></td>
                            </tr>
                        </tfoot>
                       </table>
                    </div>
                </div>
                    <Modal show={show} onHide={handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>{editingAnggota ? 'Edit Anggota' : 'Tambah Anggota'}</Modal.Title>
                        </Modal.Header>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Modal.Body>
                                {errorMessage && (
                                    <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
                                        {errorMessage}
                                    </Alert>
                                )}
                                <Col className="mb-3">
                                    <Form.Group as={Row} controlId="nama">
                                        <Form.Label>Nama</Form.Label>
                                        <Form.Control 
                                            required
                                            type="text"
                                            placeholder="Nama"
                                            name="nama"
                                            value={nama}
                                            onChange={e => setNama(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">Bagian ini harus diisi</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="alamat">
                                        <Form.Label>Alamat</Form.Label>
                                        <Form.Control 
                                            required
                                            type="text"
                                            placeholder="Alamat"
                                            name="alamat"
                                            value={alamat}
                                            onChange={e => setAlamat(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">Bagian ini harus diisi</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="telepon">
                                        <Form.Label>Nomor Telepon</Form.Label>
                                        <Form.Control 
                                            required
                                            type="text"
                                            placeholder="Nomor Telepon"
                                            name="telepon"
                                            value={telepon}
                                            onChange={e => setTelepon(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">Bagian ini harus diisi</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="submit" variant="primary">
                                    {editingAnggota ? 'Update' : 'Submit'}
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>Close</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </div>
        </div>
        </div>
    );
}

export default DaftarAnggota;
