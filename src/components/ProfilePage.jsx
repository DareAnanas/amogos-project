import React, { useState, useEffect } from "react";
import globalInstance from "../service/Interceptor";

async function uploadImage() {
  const fileInput = document.getElementById('uploadFile');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please provide image file.');
    return;
  }

  const formData = new FormData();
  formData.append('photo', file);

  try {
    const res = await fetch("https://bd-h8ye.onrender.com/userImage", {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData
    });

    const data = await res.json();
    alert(data.message || JSON.stringify(data));
  } catch (err) {
    console.error(err);
    alert('Upload failed');
  }
}

function ProfilePage() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    globalInstance
      .get("/myInfo", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Accept": "application/json",
        },
      })
      .then((response) => {
        // Log response for debugging:
        console.log("Received user info:", response.data);
        setUserInfo(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error retrieving user info:", err);
        setError("Не вдалося завантажити інформацію про користувача.");
        setLoading(false);
      });
  }, []);


  if (loading) return <p>Завантаження профілю...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-container">
      <h1>Профіль користувача</h1>

      <div className="basic-info">
        <p><strong>Ім'я:</strong> {userInfo.name}</p>
        <p><strong>Прізвище:</strong> {userInfo.surname}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Адреса:</strong> {userInfo.address}</p>
        <p><strong>Телефон:</strong> {userInfo.phone}</p>
      </div>

      {/* If extra information exists, it means the user is a shelter/owner */}
      {userInfo.owner_name && (
        <div className="shelter-info">
          <h2>Інформація про притулок</h2>
          <p>
            <strong>Ім’я власника:</strong> {userInfo.owner_name}
          </p>
          <p>
            <strong>Прізвище власника:</strong> {userInfo.owner_surname}
          </p>
          <p>
            <strong>Посада власника:</strong> {userInfo.owner_position}
          </p>
          <p>
            <strong>Вебсайт:</strong> {userInfo.website || userInfo.wetsite}
          </p>
          <p>
            <strong>Соціальні мережі:</strong> {userInfo.social_media}
          </p>
        </div>
      )}
      {/* <input type="file" id="uploadFile"/>
      <button onClick={uploadImage}>Завантажити зображення профілю</button> */}
    </div>
  );
}

export default ProfilePage;
