import Axios from 'axios';
import {URL} from './config';

const login = '/api_library/login.php';
const register = '/api_library/register.php';
const data_buku = '/api_library/data_buku.php';
const data_kategori = '/api_library/data_kategori.php';
const data_kurir = '/api_library/data_kurir.php';
const data_cart = '/api_library/data_cart.php';
const add_cart = '/api_library/add_cart.php';
const add_peminjaman = '/api_library/add_peminjaman.php';
const history_peminjaman = '/api_library/history_peminjaman.php';

// Auth
export const Login = (email, pass) => {
  let formData = new FormData();
  formData.append('email', email);
  formData.append('password', pass);
  return Axios.post(URL + login, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

export const Register = (data) => {
  return Axios.post(URL + register, data);
};

export const GetBuku = (search = '', kategori = '', limit = '') => {
  let url =
    URL +
    data_buku +
    '?search=' +
    search +
    '&kategori=' +
    kategori +
    '&limit=' +
    limit;
  return Axios.get(url);
};

export const GetKategori = (search = '') => {
  let url = URL + data_kategori + '?search=' + search;
  return Axios.get(url);
};

export const GetKurir = (search = '') => {
  let url = URL + data_kurir + '?search=' + search;
  return Axios.get(url);
};

export const GetCart = (id) => {
  let url = URL + data_cart + '?id=' + id;
  return Axios.get(url);
};

export const GetRiwayat = (id) => {
  let url = URL + history_peminjaman + '?id=' + id;
  return Axios.get(url);
};

export const AddCart = (data) => {
  let url = URL + add_cart;
  return Axios.post(url, data);
};

export const AddPeminjaman = (data) => {
  let url = URL + add_peminjaman;
  return Axios.post(url, data);
};
