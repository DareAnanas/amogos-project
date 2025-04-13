import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import globalInstance from "../service/Interceptor";
import Hamster from "./HamsterLoading";

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
  const { register, handleSubmit, reset } = useForm();
  const [userInfo, setUserInfo] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Fetch both user basic info and user image on mount.
  useEffect(() => {
    // Fetch basic user info.
    globalInstance
      .get("/myInfo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
      });

    // Fetch user image.
    globalInstance
      .get("/userImage", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("User image response:", response);
        // Assume the response data is either a complete URL or a filename.
        let photo = response.data;
        photo = `${globalInstance.defaults.baseURL}${photo}`;
        setUserPhoto(photo);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error retrieving user photo:", error);
        setLoading(false);
      });
  }, []);

  // Handle image upload form submission
  const onImageUpload = (data) => {
    if (!data.photo || data.photo.length === 0) {
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("photo", data.photo[0]);

    globalInstance
      .post("/userImage", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Assume the new image is returned as a URL string or filename.
        let photo = response.data;
        setUserPhoto(photo);
        setUploading(false);
        reset();
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        setUploading(false);
      });
  };

  if (loading) return <Hamster className="normal"></Hamster>;

  return (
    <div className="profile-container">
      <h1>Профіль користувача</h1>

      {/* <div className="profile-image-section">
        {userPhoto ? (
          <img src={userPhoto || "public/user_blank.png"} alt="Profile" className="profile-img" />
        ) : (
          <img src="default-profile.png" alt="Default Profile" className="profile-img" />
        )}

        <div className="upload-section">
          <form onSubmit={handleSubmit(onImageUpload)}>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: "Виберіть фото" })}
            />
            <button type="submit" disabled={uploading}>
              {uploading ? "Завантаження..." : "Змінити фото"}
            </button>
          </form>
        </div>
      </div> */}

      {userInfo && (
        <div className="basic-info">
          <p>
            <strong>Ім'я:</strong> {userInfo.name}
          </p>
          <p>
            <strong>Прізвище:</strong> {userInfo.surname}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p>
            <strong>Адреса:</strong> {userInfo.address}
          </p>
          <p>
            <strong>Телефон:</strong> {userInfo.phone}
          </p>

          {/* Render additional shelter/owner info if it exists */}
          {userInfo.owner_name && (
            <div className="shelter-info">
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
        </div>
      )}
      {/* <input type="file" id="uploadFile"/>
      <button onClick={uploadImage}>Завантажити зображення профілю</button> */}
    </div>
  );
}

export default ProfilePage;
