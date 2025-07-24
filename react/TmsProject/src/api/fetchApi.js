import commonApi from "./commonApi";

const BASE_URL = "http://127.0.0.1:8000/api"; 

export const userLogin = (data) => {
  return commonApi(`${BASE_URL}/login/`, "POST", data, "");
};

export const addPackage = (data) => {
    return commonApi(`${BASE_URL}/packages/`, "POST", data)
}
export const listPackages = () => {
  return commonApi(`${BASE_URL}/packages/`, "GET", "", "");
};

export const getPackage = (id) => {
  return commonApi(`${BASE_URL}/packages/${id}/`, "GET", "", "");
};
export const deletePackage = (id) => {
    return commonApi(`${BASE_URL}/packages/${id}/`, "DELETE","","")
}

export const updatePackage = (id, data) => {
    return commonApi(`${BASE_URL}/packages/${id}/`, "PATCH", data,"")
}

export const addSchedule = (data) => {
    return commonApi(`${BASE_URL}/schedules/`, "POST", data,"")
}
export const listSchedules = () => {
  return commonApi(`${BASE_URL}/schedules/`, "GET", "", "");
};

export const getSchedule = (id) => {
  return commonApi(`${BASE_URL}/schedules/${id}/`, "GET", "", "");
};
export const deleteSchedule = (id) => {
    return commonApi(`${BASE_URL}/schedules/${id}/`, "DELETE","","")
}

export const updateSchedule = (id, data) => {
    return commonApi(`${BASE_URL}/schedules/${id}/`, "PATCH", data,"")
}

export const submitEnquiry = (data) => {
  return commonApi(`${BASE_URL}/enquiries/`, "POST", data, "");
};
export const listEnquiries = () => {
    return commonApi(`${BASE_URL}/enquiries/`, "GET", "", "")
}
