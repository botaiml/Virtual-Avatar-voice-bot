import { ACTIVITIES } from "../constants/activity-config";
export const createActivityConfig = (id, data = {}) => {
  const activity = {
    name: ACTIVITIES[id].id,
    activityType: ACTIVITIES[id].activityType,
    data: data,
  };
  return activity;
};
