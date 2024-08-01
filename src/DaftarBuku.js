import React, { useEffect, useState } from "react";
import Navbar from "./Compenent/Navbar";
import { Col, Form, Modal, Row, Table, Button } from "react-bootstrap";
import { createBuku, updateBuku, fetchBuku } from "./services/bukuServices";

export default function DaftarBuku() {
    const [bukuList, setBukuList] = useState([]);
    const [show, setShow] = useState(false);
    const [namaBuku, setNamaBuku] = useState("");
    const [pengarang, setPengarang] = useState("");
    const [editBuku, setEditBuku] = useState(null);

    const handleShow = (buku = null) => {
        if (buku) {
            setEditBuku(buku.id_buku);
            setNamaBuku(buku.nama);
            setPengarang(buku.pengarang);
        } else {
            setEditBuku(null);
            setNamaBuku('');
            setPengarang('');
        }
        setShow(true);
    }

    const handleClose = () => setShow(false);

    useEffect(() => {
        const getBukuList = async () => {
            try {
                const bukuData = await fetchBuku();
                setBukuList(bukuData);
            } catch (error) {
                console.log(error);
            }
        };
        getBukuList();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataBuku = { nama: namaBuku, pengarang };
        try {
            if (editBuku) {
                await updateBuku(editBuku, dataBuku);
            } else {
                await createBuku(dataBuku);
            }
            setNamaBuku('');
            setPengarang('');
            handleClose();
            const bukuData = await fetchBuku();
            setBukuList(bukuData);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1 className="mt-5">Daftar Buku dalam Perpustakaan ini</h1>
                <p className="text-center mt-5">Berikut adalah daftar Buku yang ada dalam Perpustakaan</p>
                <Table striped bordered hover>
                    <thead className="text-center">
                        <tr>
                            <th>No</th>
                            <th>Judul Buku</th>
                            <th>Pengarang</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bukuList.map((buku, index) => (
                            <tr key={buku.id_buku}>
                                <td scope="row" className="text-center">{buku.id_buku}</td>
                                <td>{buku.nama}</td>
                                <td>{buku.pengarang}</td>
                                <td className="text-center">
                                    <Button type="button" className="btn btn-success" title="edit" onClick={() => handleShow(buku)}>
                                        <i className="fas fa-pencil"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3"></td>
                            <td className="text-center">
                                <Button className="btn btn-primary" title="Tambah Buku" onClick={() => handleShow()}>
                                    <i className="fas fa-plus"></i>
                                </Button>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editBuku ? 'Edit Buku' : 'Tambah Buku'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Col className="md-5">
                            <Form.Group as={Row} controlId="nama">
                                <Form.Label>Nama Buku</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Nama Buku" 
                                    name="name" 
                                    value={namaBuku} 
                                    onChange={e => setNamaBuku(e.target.value)} 
                                    required 
                                />
                            </Form.Group>
                            <Form.Group as={Row} controlId="pengarang">
                                <Form.Label>Pengarang</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Nama Pengarang" 
                                    name="pengarang" 
                                    value={pengarang} 
                                    onChange={e => setPengarang(e.target.value)} 
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
                            {editBuku ? 'Update' : 'Tambah'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}
