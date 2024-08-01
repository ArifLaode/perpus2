import React, { useEffect, useState } from "react";
import Navbar from "./Compenent/Navbar";
import { Col, Form, Modal, Row, Table, Button } from "react-bootstrap";
import { createPeminjam, updatePeminjam, fetchPeminjam, deletePeminjam } from "./services/peminjamServices";
import { fetchBuku } from "./services/bukuServices";

export default function DaftarPeminjam() {
    const [peminjamList, setPeminjamList] = useState([]);
    const [bukuList, setBukuList] = useState([]);
    const [show, setShow] = useState(false);
    const [namaPeminjam, setNamaPeminjam] = useState("");
    const [selectedBuku, setSelectedBuku] = useState("");
    const [tanggalPengambilan, setTanggalPengambilan] = useState("");
    const [editPeminjam, setEditPeminjam] = useState(null);
    const [selectedPeminjam, setSelectedPeminjam] = useState(null);

    const handleShow = (peminjam = null) => {
        if (peminjam) {
            setEditPeminjam(peminjam.id_peminjam);
            setNamaPeminjam(peminjam.nama_anggota);
            setSelectedBuku(peminjam.nama_buku);
            setTanggalPengambilan(peminjam.tanggal_pinjam.split('T')[0]);
        } else {
            setEditPeminjam(null);
            setNamaPeminjam('');
            setSelectedBuku('');
            setTanggalPengambilan('');
        }
        setShow(true);
    }

    const handleClose = () => setShow(false);

    useEffect(() => {
        const getPeminjamList = async () => {
            try {
                const peminjamData = await fetchPeminjam();
                setPeminjamList(peminjamData);
            } catch (error) {
                console.log(error);
            }
        };
        const getBukuList = async () => {
            try {
                const bukuData = await fetchBuku();
                setBukuList(bukuData);
            } catch (error) {
                console.log(error);
            }
        };
        getPeminjamList();
        getBukuList();
    }, []);

    const calculateReturnDate = (borrowDate) => {
        const date = new Date(borrowDate);
        date.setDate(date.getDate() + 14);
        return date.toISOString().split('T')[0];
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tanggalPengembalian = calculateReturnDate(tanggalPengambilan);
        const dataPeminjam = { 
            nama_anggota: namaPeminjam, 
            nama_buku: selectedBuku,
            tanggal_pinjam: tanggalPengambilan,
            tanggal_ambil: tanggalPengembalian
        };
        try {
            if (editPeminjam) {
                await updatePeminjam(editPeminjam, dataPeminjam);
            } else {
                await createPeminjam(dataPeminjam);
            }
            setNamaPeminjam('');
            setSelectedBuku('');
            setTanggalPengambilan('');
            handleClose();
            const peminjamData = await fetchPeminjam();
            setPeminjamList(peminjamData);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSelectPeminjam = (peminjam) => {
        setSelectedPeminjam(peminjam);
    }

    const handleDeletePeminjam = async (id) => {
        try {
            await deletePeminjam(id);
            const peminjamData = await fetchPeminjam();
            setPeminjamList(peminjamData);
            setSelectedPeminjam(null);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1 className="mt-5">Daftar Peminjam Buku</h1>
                <p className="text-center mt-5">Berikut adalah daftar Peminjam Buku di Perpustakaan</p>
                <Row>
                    <Col md={8}>
                        <Table striped bordered hover>
                            <thead className="text-center">
                                <tr>
                                    <th>ID Peminjam</th>
                                    <th>Nama Peminjam</th>
                                    <th>Nama Buku</th>
                                    <th>Tanggal Pengambilan</th>
                                    <th>Tanggal Pengembalian</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {peminjamList.map((peminjam) => (
                                    <tr key={peminjam.id_peminjam} onClick={() => handleSelectPeminjam(peminjam)}>
                                        <td className="text-center">{peminjam.id_peminjam}</td>
                                        <td>{peminjam.nama_anggota}</td>
                                        <td>{peminjam.nama_buku}</td>
                                        <td>{new Date(peminjam.tanggal_pinjam).toLocaleDateString()}</td>
                                        <td>{new Date(peminjam.tanggal_ambil).toLocaleDateString()}</td>
                                        <td className="text-center">
                                            <Button type="button" className="btn btn-success mr-2" title="edit" onClick={() => handleShow(peminjam)}>
                                                <i className="fas fa-pencil"></i>
                                            </Button>
                                            <Button type="button" className="btn btn-danger" title="delete" onClick={() => handleDeletePeminjam(peminjam.id_peminjam)}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="5"></td>
                                    <td className="text-center">
                                        <Button className="btn btn-primary" title="Tambah Peminjam" onClick={() => handleShow()}>
                                            <i className="fas fa-plus"></i>
                                        </Button>
                                    </td>
                                </tr>
                            </tfoot>
                        </Table>
                    </Col>
                    <Col md={4}>
                        {selectedPeminjam && (
                            <div className="selected-peminjam">
                                <h3>Detail Peminjam</h3>
                                <p><strong>ID:</strong> {selectedPeminjam.id_peminjam}</p>
                                <p><strong>Nama:</strong> {selectedPeminjam.nama_anggota}</p>
                                <p><strong>Buku:</strong> {selectedPeminjam.nama_buku}</p>
                                <p><strong>Tanggal Pinjam:</strong> {new Date(selectedPeminjam.tanggal_pinjam).toLocaleDateString()}</p>
                                <p><strong>Tanggal Kembali:</strong> {new Date(selectedPeminjam.tanggal_ambil).toLocaleDateString()}</p>
                            </div>
                        )}
                    </Col>
                </Row>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editPeminjam ? 'Edit Peminjam' : 'Tambah Peminjam'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Col className="md-5">
                            <Form.Group as={Row} controlId="namaPeminjam">
                                <Form.Label>Nama Peminjam</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Nama Peminjam" 
                                    name="nama_anggota" 
                                    value={namaPeminjam} 
                                    onChange={e => setNamaPeminjam(e.target.value)} 
                                    required 
                                />
                            </Form.Group>
                            <Form.Group as={Row} controlId="bukuDropdown">
                                <Form.Label>Pilih Buku</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    value={selectedBuku} 
                                    onChange={e => setSelectedBuku(e.target.value)}
                                    required
                                >
                                    <option value="">Pilih Buku</option>
                                    {bukuList.map(buku => (
                                        <option key={buku.id_buku} value={buku.nama}>{buku.nama}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Row} controlId="tanggalPengambilan">
                                <Form.Label>Tanggal Pengambilan</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    name="tanggal_pinjam" 
                                    value={tanggalPengambilan} 
                                    onChange={e => setTanggalPengambilan(e.target.value)} 
                                    required 
                                />
                            </Form.Group>
                        </Col>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            {editPeminjam ? 'Update' : 'Tambah'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}