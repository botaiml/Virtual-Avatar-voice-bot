import React, { useEffect, useState } from "react";
import styles from "./FaceSearch.module.css";
import { useDispatch, useSelector } from "react-redux";
import faceApiService from "../../services/faceApiService";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { INITIALISE as InitAudioData } from "../../store/actions/audioData";


export default function FaceSearch() {
  const activity = useSelector((state) => state.activity);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    console.log(activity?.data?.indexId);
    const getUser = async () => {
      try {
        const result = await faceApiService.getUserByIndexId(
          activity?.data?.indexId
        );
        setUserData(result.user);
        let text = `Welcome ${result.user.name}, Moving into appointments`;
        const { metadata, mouthCues } = await SpeechApiService.getSpeechData(
          text
        )        
        dispatch({
          type: InitAudioData,
          payload: { audio_byte: metadata.soundFile, mouthque: mouthCues },
        });
      } catch (error) {}
    };
    if (activity) getUser();
  }, [activity]);
  return (
    <>
      {userData && (
        <Card sx={{ maxWidth: 300, margin: "auto", textAlign: "center" }}>
          <Avatar
            alt={userData.name}
            src="URL_TO_PROFILE_IMAGE"
            sx={{ width: 80, height: 80, margin: "20px auto" }}
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {userData.name}
            </Typography>
            {/* <Typography color="text.secondary">ID: {userData.id}</Typography> */}
            <Typography color="text.secondary">
              Email: {userData.email}
            </Typography>
            <Typography color="text.secondary">
              Phone Number: {userData.phoneNumber}
            </Typography>
            <Typography color="text.secondary">
              Date of Birth: {userData.DOB}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}
