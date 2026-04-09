import axios from "axios";

const API = "https://qgen-backend-n815.onrender.com/api/qr";

// Create QR (existing)
export const createQR = async (payload) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(API, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;

  } catch (error) {
    console.error(error);
  }
};

// 🚀 FIXED: Create QR for DOCUMENT
export const createDocumentQR = async (documentId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${API}/document`,
      { documentId },   // ✅ correct format
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

// Analytics
export const getQRAnalytics = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/analytics`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
};