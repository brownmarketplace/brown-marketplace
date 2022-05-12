import React from 'react'
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
// import Dropzone from 'react-dropzone-uploader'
// import 'react-dropzone-uploader/dist/styles.css'
import './add-details.css'

function AddPhotos({handleInputChange, productImgUrls}) {
    // const getUploadParams = ({ meta }) => {
    //   const url = 'https://httpbin.org/post'
    //   return { url, meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` } }
    // }
  
    // const handleChangeStatus = ({ meta }, status) => {
    //   console.log(status, meta)
    // }
  
    // const handleSubmit = (files, allFiles) => {
    //   console.log(files.map(f => f.meta))
    //   allFiles.forEach(f => f.remove())
    // }
  
    // return (
    //   <Dropzone
    //     getUploadParams={getUploadParams}
    //     onChangeStatus={handleChangeStatus}
    //     onSubmit={handleSubmit}
    //     accept="image/*,audio/*,video/*"
    //     inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
    //     styles={{
    //       dropzoneReject: { borderColor: 'blue', backgroundColor: 'lightblue' },
    //       inputLabel: (files, extra) => (extra.reject ? { color: 'lightblue' } : {}),
    //     }}
    //   />
    // )



    // const ImageUrlInput = (props) => {
    //     if (props.optional) {
    //         return (
    //             <div style={{ marginTop: "10px" }}>
    //                 <TextField
    //                     id="outlined-multiline-static"
    //                     multiline
    //                     rows={1}
    //                     variant="outlined"
    //                     placeholder=""
    //                     className="details-text"
    //                     onChange={props.handleInputChange}
    //                     name="productImgUrls"
    //                     value={props.productImgUrls}
    //                 />
    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div style={{ marginTop: "10px" }}>
    //                 <TextField
    //                     id="outlined-multiline-static"
    //                     multiline
    //                     rows={1}
    //                     variant="outlined"
    //                     placeholder="Enter up to 6 item image urls:"
    //                     className="details-text"
    //                     onChange={props.handleInputChange}
    //                     name="productImgUrls"
    //                     value={props.productImgUrls}
    //                 />
    //             </div>
    //         )
    //     }
    // }

    return (
        <div className="add-details">
            <div>
                <Chip 
                label="Item Photos" 
                className="details-chip" 
                color="primary" 
                />
            </div>
            <div style={{ marginTop: "10px" }}>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={1}
                        variant="outlined"
                        placeholder="Enter up to 6 comma-separated image urls."
                        className="details-text"
                        onChange={handleInputChange}
                        name="productImgUrls"
                        value={productImgUrls}
                    />
                </div>
            {/* <ImageUrlInput optional={false} productImgUrls={productImgUrls} onChange={handleInputChange}/>
            <ImageUrlInput optional={true} productImgUrls={productImgUrls} onChange={handleInputChange}/>
            <ImageUrlInput optional={true} productImgUrls={productImgUrls} onChange={handleInputChange}/>
            <ImageUrlInput optional={true} productImgUrls={productImgUrls} onChange={handleInputChange}/>
            <ImageUrlInput optional={true} productImgUrls={productImgUrls} onChange={handleInputChange}/>
            <ImageUrlInput optional={true} productImgUrls={productImgUrls} onChange={handleInputChange}/> */}
        </div>
    )
}

export default AddPhotos
