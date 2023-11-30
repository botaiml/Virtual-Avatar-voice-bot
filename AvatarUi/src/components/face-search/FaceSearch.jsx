import React, { useEffect, useState } from "react";
import styles from "./FaceSearch.module.css";
import { useDispatch, useSelector } from "react-redux";
import faceApiService from "../../services/faceApiService";

export default function FaceSearch() {
  const activity = useSelector((state) => state.activity);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(activity?.data?.indexId);
    const getUser = async () => {
      try {
        console.log("GET USER")
        const result = await faceApiService.getUserByIndexId(activity?.data?.indexId);
        console.log(result);
      } catch (error) {}
    };
    if (activity) getUser();
  }, [activity]);
  return <div>FaceSearch</div>;
}
