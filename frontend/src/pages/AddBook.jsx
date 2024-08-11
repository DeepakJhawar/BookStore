import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        data.url === "" ||
        data.author === "" ||
        data.desc === "" ||
        data.language === "" ||
        data.price === "" ||
        data.title === ""
      )
        alert("All fields are required");
      else {
        const res = await axios.post(
          "http://localhost:4000/api/v1/add-book",
          data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Add Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        <div className="mt-4">
          <label className="text-zinc-400">Image URL</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="url"
            required
            name="url"
            value={data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label className="text-zinc-400">Title</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Title"
            required
            name="title"
            value={data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label className="text-zinc-400">Author</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Author"
            required
            name="author"
            value={data.author}
            onChange={change}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label className="text-zinc-400">Language</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Language"
              required
              name="language"
              value={data.language}
              onChange={change}
            />
          </div>
          <div className="w-3/6">
            <label className="text-zinc-400">Price</label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="price"
              required
              name="price"
              value={data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-zinc-400">Description</label>
          <textarea
            type="text"
            rows={5}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Description"
            required
            name="desc"
            value={data.desc}
            onChange={change}
          />
        </div>
        <button onClick={submit} className="my-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300">
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
