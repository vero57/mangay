"use client";

import React, { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { useRouter } from "next/navigation";

function getCroppedImg(imageSrc: string, crop: Area): Promise<string> {
  return new Promise((resolve) => {
    const image = new window.Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );
      resolve(canvas.toDataURL("image/jpeg"));
    };
  });
}

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const [croppedPic, setCroppedPic] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropping, setCropping] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profile_picture" && files && files[0]) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setProfilePicFile(file);
      setProfilePicUrl(url);
      setCropping(true);
      setCroppedPic(null);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCropper = cropping && profilePicUrl && !croppedPic;

  const handleCropSave = async () => {
    if (profilePicUrl && croppedAreaPixels) {
      const cropped = await getCroppedImg(profilePicUrl, croppedAreaPixels);
      setCroppedPic(cropped);
      setCropping(false);
      URL.revokeObjectURL(profilePicUrl);
      setProfilePicUrl(null);
    }
  };

  const handleChangeImage = () => {
    setProfilePicFile(null);
    setProfilePicUrl(null);
    setCroppedPic(null);
    setCropping(false);
    if (inputFileRef.current) inputFileRef.current.value = "";
  };

  const handleDeleteImage = () => {
    handleChangeImage();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const payload = {
        ...form,
        profile_picture: croppedPic,
      };
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || "Register failed");
      } else {
        router.push("/auth/login?created=1");
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md"
        encType="multipart/form-data"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Register
        </h1>
        <div className="mb-4">
          <label className="block mb-1 text-sm" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-sm" htmlFor="profile_picture">
            Profile Picture
          </label>
          {/* Preview & Cropper */}
          <div className="flex flex-col items-center">
            {!croppedPic && (
              <input
                id="profile_picture"
                name="profile_picture"
                type="file"
                accept="image/*"
                className="w-full text-gray-300"
                onChange={handleChange}
                ref={inputFileRef}
                style={{ display: showCropper ? "none" : undefined }}
              />
            )}
            {/* Cropper Modal */}
            {showCropper && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                <div className="bg-gray-900 p-4 rounded-lg shadow-lg flex flex-col items-center">
                  <div className="relative w-96 h-96 bg-black">
                    <Cropper
                      image={profilePicUrl!}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={handleCropComplete}
                      cropShape="rect"
                      showGrid={false}
                    />
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                      onClick={handleCropSave}
                    >
                      Crop & Save
                    </button>
                    <button
                      type="button"
                      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
                      onClick={handleChangeImage}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Preview */}
            {croppedPic && (
              <div className="mb-2 flex flex-col items-center">
                <div
                  className="w-32 h-32 rounded-lg overflow-hidden bg-gray-700 mb-2"
                  style={{ aspectRatio: "1/1" }}
                >
                  <img
                    src={croppedPic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover pointer-events-none select-none"
                    draggable={false}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded"
                    onClick={handleDeleteImage}
                  >
                    Delete image
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {errorMsg && (
          <div className="mb-4 text-red-400 text-center">{errorMsg}</div>
        )}
        {successMsg && (
          <div className="mb-4 text-green-400 text-center">{successMsg}</div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="mt-4 text-center text-sm">
          Sudah punya akun?{" "}
          <a href="/auth/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
