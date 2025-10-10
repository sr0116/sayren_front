"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminFaqPage() {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        axios.get("/api/admin/faqs")
            .then(res => setFaqs(res.data))
            .catch(console.error);
    }, []);

    return (
        <div>
            <h2>FAQ 목록</h2>
            <ul>
                {faqs.map(f => (
                    <li key={f.id}>{f.title}</li>
                ))}
            </ul>
        </div>
    );
}
