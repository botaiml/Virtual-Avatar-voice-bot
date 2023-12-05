import React, { useEffect, useState } from "react";
import styles from "./UserEnroll.module.css";
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
import SnackBar from "../SnackBar";
import { SEARCHFACE } from "../../store/actions/activity";
export default function UserEnroll() {
  const activity = useSelector((state) => state.activity);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    emailAddress: "",
    dob: null,
  });
  const [notify, setNotify] = useState({
    open: false,
    message: "This is notification",
  });
  useEffect(() => {
    console.log(activity);
  }, []);

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
      indexIds: activity?.data?.indexIds,
    };
    try {
      const result = await faceApiService.enrollUser(requestBody);
      if (result.success) {
        setNotify({
          open: true,
          message: "Enrollment success..",
        });
        dispatch({
          type: SEARCHFACE,
          payload: activityConfig(2, { indexId: activity?.data?.indexIds[0] }),
        });
      } else {
        setNotify({
          open: true,
          message: "Enrollment falied..",
        });
      }
    } catch (error) {
      console.log(error.message);
      setNotify({
        open: true,
        message: "Enrollment failed",
      });
      throw error;
    }
  };

  const closeSnackBar = () => {
    setNotify({ open: false, message: "" });
  };
  return (
    <>
      <SnackBar
        notifyOpen={notify.open}
        notifyMessage={notify.message}
        closeSnackBar={closeSnackBar}
      />
      {activity?.data && (
        <div className={styles.myapp}>
          <h1>User Enrollment</h1>
          <form className={styles.form_user}>
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

            <Button className={styles.button} variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
