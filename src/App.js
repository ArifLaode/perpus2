import './App.css';
import Navbar from './Compenent/Navbar';

function App() {
  return (
    <div>
      <Navbar />
    <div className='container'>
      <h1 className='text-center mt-5'>Selamat Datang di Perpustakaan Sederhana</h1>
      <p className='text-center'>Ini adalah program simpel yang akan digunakan untuk mengerjakan tugas kami. Nama saya adalah Inces. Salam kenal!</p>
      <div className='text-center mt-3'>
      <button className='btn btn-primary'>Click This Nigga</button>
      </div>
    </div>
    </div>
  );
}

export default App;
