import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";

const imagesUploadSchema = Yup.object().shape({
  picture: Yup.string().required("A file is required"),
});
const initialValues = {
  picture: "",
};

function ImageLinkUpload() {
  const handleSubmit = (e) => {
    console.log("nothing");
  };
  return (
    <div className="upload-container">
      <div className="drop-container">
        <div className="drop-form">
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={imagesUploadSchema}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              setFieldValue,
              touched,
              handleBlur,
              resetForm,
              errors,
            }) => (
              <form onSubmit={handleSubmit}>
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={true}
                  onDrop={(acceptedFiles) => {
                    setFieldValue("picture", acceptedFiles[0]);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      ) : (
                        <p>Files selected: {values.picture.name}</p>
                      )}
                    </div>
                  )}
                </Dropzone>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkUpload;
