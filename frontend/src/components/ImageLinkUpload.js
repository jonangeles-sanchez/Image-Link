import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { updateImageLink } from "../features/imagelink/imagelinkSlice";

const imagesUploadSchema = Yup.object().shape({
  picture: Yup.string().required("A file is required"),
});
const initialValues = {
  picture: [],
};

function ImageLinkUpload(props) {
  const [files, setFiles] = useState([]);
  const selectedLink = props.currLink;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const handleDeleteUpload = (e) => {
    //remove the file from the array of files
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    //Upload images to the server
    try {
      console.log(values);
      const formData = new FormData();
      console.log("Submitting form");
      values.picture.forEach((file) => {
        formData.append("photos", file);
      });
      console.log("Form data" + formData);
      // Display the key/value pairs
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      console.log("props.selectedLink: " + props.selectedLink);
      console.log("onSubmitProps: " + onSubmitProps);
      dispatch(updateImageLink({ data: formData, id: props.currLink }));

      //Reset the form
      onSubmitProps.resetForm();
      setFiles([]);
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const handleSuccess = () => {
    setSuccess(true);
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <>
      {success && <p className="success-msg">*****Upload successful!*****</p>}
      {error && <p className="error-msg">*****Upload failed!*****</p>}
      {selectedLink ? (
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
                        setFiles([...files, ...acceptedFiles]);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: "dropzone" })}>
                          <input {...getInputProps({ name: "picture" })} />
                          {values.picture.length === 0 ? (
                            <p>
                              Drag 'n' drop some files here, or click to select
                              files
                            </p>
                          ) : (
                            //Print each image name in the array
                            values.picture.map((file) => (
                              <div key={file.name}>
                                <p key={file.name}>
                                  {file.name + " has been chosen."}
                                  <button
                                    className="button-delete-upload"
                                    onClick={handleDeleteUpload}
                                  >
                                    Delete
                                  </button>
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </Dropzone>
                    {files.length > 0 && (
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    )}
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      ) : (
        <p>Please select or create a new image collection</p>
      )}
    </>
  );
}

export default ImageLinkUpload;
