import React from 'react'


export const MenuImage = ({values,setImage,showMenuImage,showInputUrl}) => {

  const extensions = ["jpg","png","gif","svg"];

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    console.log(file);
    if(file){
   
        values.photo = file;

        const extension = values.photo.name.split(".");

        const ext = extension[extension.length-1];

        if(extensions.includes(ext.toLowerCase())){
            setImage( URL.createObjectURL(values.photo) );
        }
    }
    showMenuImage(false)
  }

  const handleShowInput = () => {
    console.log('se');
    showInputUrl(true)
    
    showMenuImage(false)
  }

  return (
    <div className="div__menu">
      <div className="div__title_description">
        <span className="title">Select options</span>
        <p className="description gray3Color">
          Choose how to submit the image
        </p>
      </div>

      <div className="select_privacity">

        <div >
          <label htmlFor='fileGallery' className="privacity">
            <input type="file" 
                      id="fileGallery" 
                      hidden
                      accept=".jpg, .jpeg, .png" 
                      onChangeCapture={handleFileChange}
                      multiple />
              <span className="material-icons mrg_r_9 black">collections</span>
              <span className="reply">File Image</span>
          </label>    
          
        </div>

        <div className="privacity" onClick={handleShowInput}>
          <span className="material-icons mrg_r_9 black">collections</span>
          <span className="reply">Url Image</span>
        </div>
      </div>
    </div>
  )
}
