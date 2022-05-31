
import Head from "next/head";
import "../styles/main.scss";
import "../styles/style.scss";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const app = {};

app.baseURL = 'http://localhost:5000/api'

var _token = '';
 if (typeof window !== 'undefined') {
	_token =  localStorage.getItem('_token_wired')
}


app.toast = (msg,type='default')=> {
  const config = {autoClose:1500,position: toast.POSITION.BOTTOM_CENTER,hideProgressBar:true,type};
    if(typeof msg == 'string')
     return toast(msg, config);
    


     msg.map(m=>{
       toast(m,config)
     })
   
};

app.get = async (url,callback=function(){})=>{
  let config = {
    headers: {
      Authorization: 'Bearer '+_token,
    }
  }
	var data = {};
	await axios.get(`${app.baseURL}${url}`,config)
      .then(res => {
        data = res.data;
        callback(null,data)
      }).catch(err=>{
      	callback(err)
      	data = err;
      });

      return data;
}


app.post = async (url,body,callback=function(){})=>{
  let config = {
    headers: {
      Authorization: 'Bearer '+_token,
    }
  }

	var data = {};
	await axios.post(`${app.baseURL}${url}`,body,config)
      .then(res => {
        data = res.data;
        callback(null,data)
      }).catch(err=>{
      	callback(err)
      	data = err;
      });

      return data;
}


app.put = async (url,body,callback=function(){})=>{
  let config = {
    headers: {
      Authorization: 'Bearer '+_token,
    }
  }

	var data = {};
	await axios.put(`${app.baseURL}${url}`,body,config)
      .then(res => {
        data = res.data;
        callback(null,data)
      }).catch(err=>{
      	callback(err)
      	data = err;
      });

      return data;
}

app.delete = async (url,body,callback=function(){})=>{
  let headers = {
      Authorization: 'Bearer '+_token,
    }
  

	var data = {};
	await axios.delete(`${app.baseURL}${url}`, {data:body, headers})
      .then(res => {
        data = res.data;
        callback(null,data)
      }).catch(err=>{
      	callback(err)
      	data = err;
      });

      return data;
}


app.date = (d = new Date())=>{

  var dd = d.getDate();
  var mm = d.getMonth();
  var yy = d.getFullYear();
  mm++;
  return  `${dd<10?'0'+dd:dd}-${mm<10?'0'+mm:mm}-${yy}`;
}

app.day = (d = new Date())=>{
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var i = d.getDay();
  return  `${days[i]}`;
}

global.app = app;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Wired Reviews</title>
        <meta
          name="description"
          content="Ample Admin Next Js Aadmin Dashboard "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
        <Component {...pageProps} />
        <ToastContainer/>
    </>
  );
}

export default MyApp;
