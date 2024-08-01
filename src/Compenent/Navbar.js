import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Navbar.css';  // Import CSS kustom

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent mx-auto" style={{paddingLeft: '50px'}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
        Perpustakaan
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/"><i className='fas fa-home'></i>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/daftarPeminjam"><i className='fas fa-users-viewfinder'></i>Daftar Peminjam</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/daftarBuku"><i className='fas fa-book'></i>Daftar Buku</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/daftarAnggota" tabIndex="-1"><i className='fas fa-user'></i>Daftar Anggota</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
