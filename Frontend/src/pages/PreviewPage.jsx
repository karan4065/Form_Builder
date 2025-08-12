// src/pages/PreviewPage.jsx
import React, { useEffect, useState } from "react";
import PreviewForm from "../components/PreviewForm";
import API from "../api";
import { useParams } from "react-router-dom";

const PreviewPage = () => {
  const { id } = useParams(); 
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await API.get(`/forms/${id}`);
        setForm(res.data);
      } catch (error) {
        console.error("Error loading form:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchForm();
    }
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading form...</p>;
  }

  if (!form) {
    return <p className="p-6 text-red-500">Form not found</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
      <PreviewForm questions={form.questions} />
    </div>
  );
};

export default PreviewPage;
