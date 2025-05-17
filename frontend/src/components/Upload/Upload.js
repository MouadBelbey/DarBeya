// Filename - App.js

import React, { useState } from "react";
import "./Upload.css";

const Upload = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    if(event.target.files){
     setImage(event.target.files[0]);
    }
  };


  const handleUpload = async () => {
   if (image) {
     console.log("Uploading Image...");

     const formData = new FormData();
     formData.append("Image", image);

     try {
       // You can write the URL of your server or any other endpoint used for file upload
       const result = await fetch("http://localhost:3000//post", {
         method: "POST",
         body: formData,
       });

       const data = await result.json();

       console.log(data);
     } catch (error) {
       console.error(error);
     }
   }
 };
  
  return(
   <div className="container">
     <label htmlFor='file' className='choisir-fichier'>
      <h1>Ajouter une image</h1> 
     </label>
     <div className="content">
       <input type="file" onChange={handleImageUpload} />
       <button class="button" onClick={handleUpload}>Televerser une image</button>
     </div>
   </div> 

  );
};

export default Upload;









/*

derniere version 
import React, { useState } from "react";

const Upload = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail"
  >("initial");

  const handleFileChange = (event) => {
    if (event.target.files) {
      setStatus("initial");
      setFiles(event.target.files);
    }
  };

  const handleUpload = async () => {
    if (files) {
      setStatus("uploading");

      const formData = new FormData();

      [...files].forEach((file) => {
        formData.append("files", file);
      });

      try {
        const result = await fetch("http://localhost:3000//post", {
          method: "POST",
          body: formData,
        });

        const data = await result.json();

        console.log(data);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("fail");
      }
    }
  };

  return (
    <>
      <div className="input-group">
        <label htmlFor="file" className="sr-only">
          Choose files
        </label>
        <input id="file" type="file" multiple onChange={handleFileChange} />
      </div>
      {files &&
        [...files].map((file, index) => (
          <section key={file.name}>
            File number {index + 1} details:
            <ul>
              <li>Name: {file.name}</li>
              <li>Type: {file.type}</li>
              <li>Size: {file.size} bytes</li>
            </ul>
          </section>
        ))}

      {files && (
        <button onClick={handleUpload} className="submit">
          Upload {files.length > 1 ? "files" : "a file"}
        </button>
      )}

      
    </>
  );
};


  



export default Upload;
*/

/*
quatrieme version

import { useEffect, useState } from "react";
import axios from "axios";


function Upload() {
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState(null);

  useEffect(() => {
    getImage();
  }, []);
  const submitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post(
      "http://localhost:3000/",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  };

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const getImage = async () => {
    const result = await axios.get("http://localhost:3000/get-image");
    console.log(result);
    setAllImage(result.data.data);
  };

  return (
    <div>
      <form onSubmit={submitImage}>
        <input type="file" accept="image/*" onChange={onInputChange}></input>
        <button type="submit">Submit</button>
      </form>
      {allImage == null
        ? ""
        : allImage.map((data) => {
            return (
              <img
                src={require(`../../assets${data.image}`)}
                height={100}
                width={100}
              />
            );
          })}
    </div>
  );
}
export default Upload;

/*




/*
troisieme version

export default class Upload extends Component{
     
  
  fileObj = [];
  fileArray = [];
   
  constructor(props) {
      super(props);
       
      this.state = {
          file: [null]
      };
       
      this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
      this.uploadFile = this.uploadFile.bind(this)
  }

  uploadMultipleFiles(e) {
      this.fileObj.push(e.target.files)
      for (let i = 0; i < this.fileObj[0].length; i++) {
          this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
      }
      this.setState({ file: this.fileArray })
  }


   
  async onSubmit(e){
      e.preventDefault() 
      this.uploadFile(this.state.file);
      console.log(this.state.file);
  }

  async uploadFile(file){ 
      const formData = new FormData();
      console.log(formData);
  }

  render() {
      return (
          <div className="row">
              {(this.fileArray || []).map(url => (
                  <div className="image">
                      <img src={url} alt="..." key={url} className="img-responsive rounded"/>
                  </div>
              ))}
               
              <form onSubmit={ this.onSubmit } className="form-inline">
                  <p><h3>Televersement d'images</h3></p> 
                  <div className="form-group">
                      <input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />
                  </div>
                  <div><button type="submit" className="btn btn-success" >Televerser une image</button></div>
              </form >
          </div>
      )
  }
}
*/


/*
 deuxieme version

const Upload = () => {
   const [image, setImage] = useState(null);

   const handleImageUpload = (event) => {
     if(event.target.files){
      setImage(event.target.files[0]);
     }
   };


   const handleUpload = async () => {
    if (image) {
      console.log("Uploading Image...");

      const formData = new FormData();
      formData.append("Image", image);

      try {
        // You can write the URL of your server or any other endpoint used for file upload
        const result = await fetch("http://localhost:3000//post", {
          method: "POST",
          body: formData,
        });

        const data = await result.json();

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };
   
   return(
    <div className="container">
      <label htmlFor='file' className='choisir-fichier'>
        Choisir un fichier
      </label>
      <div className="content">
        <input type="file" onChange={handleImageUpload} />
        <button class="button" onClick={handleUpload}>Televerser une image</button>
      </div>
    </div> 

   );
};

export default Upload;

*/




/*
premiere version

import React, { useState } from "react";

function Upload() {
	const [file, setFile] = useState();
	function handleChange(e) {
		console.log(e.target.files);
		setFile(URL.createObjectURL(e.target.files[0]));
	}

	return (
		<div className="App">
			<h2>Add Image:</h2>
			<input type="file" onChange={handleChange} />
			<img src={file} />
		</div>
	);
}

export default Upload;
*/

/*
code important

const handleUpload = () => {
  const formData = new FormData();
  formData.append('file', selectedFile);
  axios.post('/api/upload', formData)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
*/