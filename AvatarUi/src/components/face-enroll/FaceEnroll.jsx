import React, { useEffect, useState } from "react";
import styles from "./FaceEnroll.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createActivityConfig as activityConfig } from "../../helpers/activity-helper";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Typography from "@mui/material/Typography";
import faceApiService from "../../services/faceApiService";
export default function FaceEnroll() {
  const activity = useSelector((state) => state.activity);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    emailAddress: "",
    dob: null,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  const handleSubmit = async () => {
    // Dispatch an action to make an API request with formData
    console.log(formData);

    let requestBody = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      email: formData.emailAddress,
      dob: formData.dob.format("DD-MM-YYYY"),
      images: activity?.data?.faceImages.map((e) =>
        e.replace("data:image/png;base64,", "")
      ),
    };
    try {
      const result = await faceApiService.enrollFace(requestBody);
      console.log(result);
      debugger;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
    // dispatch(submitFormData(formData));
  };
  return (
    <>
      {activity?.data && (
        <div className={styles.myapp}>
          <h1>Face Enrollment</h1>
          <form>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Email Address"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              margin="normal"
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="DOB"
                  name="dob"
                  value={formData.dob}
                  onChange={handleDateChange}
                />
              </DemoContainer>
            </LocalizationProvider>
            {/* Display 5 face images */}
            <div className={styles.captured_faces}>
              {activity?.data?.faceImages.map((face, index) => (
                <div
                  key={index}
                  className={styles.captured_face}
                  style={{ marginRight: "10px" }}
                >
                  <img src={face} alt={`Captured Face ${index}`} />
                </div>
              ))}
            </div>

            {/* Submit button */}
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
