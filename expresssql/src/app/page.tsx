"use client";

import { useState } from "react";
import "dotenv/config";
export default function Home() {
  interface FORM {
    name: string;
    age: number | string;
  }

  const [formdata, setFormData] = useState<FORM>({
    name: "",
    age: "",
  });

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const parsedValue = name === "age" ? Number(value) : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };
  const onClickButton = async () => {
    try {
      const dataToSend = {
        name: formdata.name,
        age: Number(formdata.age),
      };
      await fetch(`${baseUrl}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      setFormData({
        name: "",
        age: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <input
        type="text"
        onChange={onChangeInput}
        value={formdata?.name}
        name="name"
        placeholder="이름을 입력하세요"
      />
      <input
        type="number"
        onChange={onChangeInput}
        value={formdata?.age}
        name="age"
        placeholder="나이를 입력하세요"
      />
      <button onClick={onClickButton}>확인</button>
    </>
  );
}
