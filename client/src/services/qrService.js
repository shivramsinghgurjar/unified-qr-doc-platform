import axios from "axios";

const API = "http://localhost:5000/api/qr";

// Create QR
export const createQR = async (payload) => {
  try {

    const token = localStorage.getItem("token");

    const res = await axios.post(
      API,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;

  } catch (error) {
    console.error(error);
  }
};


// Get User QRs
export const getUserQRs = async () => {

  const token = localStorage.getItem("token");

  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


// Delete QR
export const deleteQR = async (id) => {

  const token = localStorage.getItem("token");

  await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

};

export const getQRAnalytics = async () => {

  const token = localStorage.getItem("token")

  const res = await fetch("http://localhost:5000/api/qr/analytics", {

    headers: {
      Authorization: `Bearer ${token}`
    }

  })

  return res.json()

}