import React from 'react'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

function AddPhotos() {
    const getUploadParams = ({ meta }) => {
      const url = 'https://httpbin.org/post'
      return { url, meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` } }
    }
  
    const handleChangeStatus = ({ meta }, status) => {
      console.log(status, meta)
    }
  
    const handleSubmit = (files, allFiles) => {
      console.log(files.map(f => f.meta))
      allFiles.forEach(f => f.remove())
    }
  
    return (
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="image/*,audio/*,video/*"
        inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
        styles={{
          dropzoneReject: { borderColor: 'blue', backgroundColor: 'lightblue' },
          inputLabel: (files, extra) => (extra.reject ? { color: 'lightblue' } : {}),
        }}
      />
    )
}

export default AddPhotos
