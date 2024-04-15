const calculateHour = (data) => {
  const [date, hour] = data.split(" ");
  const [hour_int, hour_ext] = hour.split(".");
  const hour_min = hour_int.split(":");
  return hour_min[0] + ":" + hour_min[1];
};

export default calculateHour;
