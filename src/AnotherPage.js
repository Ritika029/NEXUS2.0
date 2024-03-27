import React from 'react';
import { useNavigate } from 'react-router-dom';
import {create as ipfsHttpClient} from 'ipfs-http-client'

const AnotherPage = () => {
  const navigate = useNavigate()
  const [file, setFile] = React.useState()
  const [uploadedImages, setUploadedImages] = React.useState()
  const [link, setLink] = React.useState("")

  const projectId = "2OFpkjdSKUiJCRJfbI9QRZRICV8";
const projectSecret = "6eeb6d7bf188824bfb895b953c98ae08";

  const authorization = "Basic " + btoa(projectId + ":" + projectSecret);


  function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("demo").innerHTML = this.responseText;
            console.log(this);
            window.open(this.responseURL);
        }
    };
    console.log(document.getElementById("filehash").value)
    xhttp.open("GET", "download/" + document.getElementById("filehash").value, true);
    xhttp.send();
}
function redirecta() {
    navigate('/');
}

const ipfs = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/",
  headers: {
    authorization,
  },
});

  async function handleSubmit(e) {
  e.preventDefault()

  const formData = new FormData()
  formData.append('file', file)

  const result  = await ipfs.add(file)

  setUploadedImages(
    {
      cid: result.cid,
      path: result.path
    }
  )
}

  return (
    <div>
      {!uploadedImages ?
    <div>
    <img src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/google_nexus-512.png" alt="image" style={{width: '20%', height: 'auto', border: '8%', padding: '0', margin: '0 10%'}}/>

    <form onSubmit={handleSubmit} enctype="multipart/form-data" id="formi" style={{margin: '0 10% 10% 10%'}}>
        <input type="file" name="avatar" onChange={e => setFile(e.currentTarget.files[0])} id="fffid" style={{color: 'rgb(28, 42, 232)', fontSize: '1.5rem'}} />
        <button id="fffid2" type='submit' style={{color: 'rgb(28, 42, 232)', fontsize: '1.5rem', backgroundcolor: 'rgb(188, 192, 255)', margin: '0 0 10% 10%'}}>upload</button>
    </form>
    <input id="filehash" type="text" value={link} onChange={e => setLink(e.currentTarget.value)} style={{color: 'rgb(28, 42, 232)', fontSize: "1.5rem", backgroundColor: 'rgb(188, 192, 255)', margin: "0 5% 10% 10%"}} />
    <a target='blank' id="fffid2" href={`https://skywalker.infura-ipfs.io/ipfs/${link}`}>download</a>
    <button onClick={redirecta} id="fffid3" style={{color: 'rgb(28, 42, 232)', fontsize: '1.5rem', backgroundcolor: 'rgb(188, 192, 255)', margin: '0 0 10% 10%'}}>Logout</button>
</div> :  
 <>
 <img
   className="image"
   src={"https://skywalker.infura-ipfs.io/ipfs/" + uploadedImages.path}
   style={{ maxWidth: "400px", margin: "15px" }}
 />
 <h4>Link to IPFS:</h4>
 <h2>{uploadedImages.path}</h2>
 {/* <a href={"https://skywalker.infura-ipfs.io/ipfs/" + uploadedImages.path}>
   <h3>{"https://skywalker.infura-ipfs.io/ipfs/" + uploadedImages.path}</h3>
 </a> */}
</>
    }

           
    </div>
  );
}

export default AnotherPage;