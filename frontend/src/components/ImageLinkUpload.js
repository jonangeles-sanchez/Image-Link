import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";

const imagesUploadSchema = Yup.object().shape({
  picture: Yup.string().required("A file is required"),
});
const initialValues = {
  picture: [],
};

function ImageLinkUpload() {
  const handleFormSubmit = async (values, onSubmitProps) => {
    //Upload images to the server
    console.log(values);
    const formData = new FormData();
    console.log("Submitting form");
    for (let i = 0; i < values.picture.length; i++) {
      formData.append("picture", values.picture[i].name);
    }
    console.log(formData);
    // Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    // const response = await fetch("/api/upload", {
    //   method: "POST",
    //   body: formData,
    // });
    // const data = await response.json();
    // console.log(data);
    // //Reset the form
    // resetForm();
  };
  return (
    <div className="upload-container">
      <div className="drop-container">
        <div className="drop-form">
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validator={() => ({})}
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
                    for (let i = 0; i < acceptedFiles.length; i++) {
                      if (
                        values.picture.find(
                          (file) => file.name === acceptedFiles[i].name
                        )
                      ) {
                        alert("File already exists in the list.");
                        return;
                      }
                    }
                    setFieldValue(
                      "picture",
                      values.picture.concat(acceptedFiles)
                    );
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      {values.picture.length === 0 ? (
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      ) : (
                        //Print each image name in the array
                        values.picture.map((file) => (
                          <p key={file.name}>
                            {file.name + " has been chosen."}
                          </p>
                        ))
                      )}
                      {console.log(values)}
                    </div>
                  )}
                </Dropzone>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkUpload;
