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
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(files);
  });
  const handleDeleteUpload = (e) => {
    //remove the file from the array of files
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    //Upload images to the server
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
    dispatch(updateImageLink({ data: formData, id: props.currLink }));
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
                          <div>
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
                      {console.log(values)}
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
  );
}

export default ImageLinkUpload;
