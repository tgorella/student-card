import React, { useState, useEffect } from "react";
import TextField from "./form/TextField";
import { useHistory } from "react-router-dom";
import { validator } from "../utils/validator";

const AddForm = () => {
  const [errors, setErrors] = useState({});

  const [data, setData] = useState({
    name: "",
    surname: "",
    yearOfBirth: "",
    portfolio: "",
  });

  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"));
    student && setData(student);
    student && setIsNew(false);
  }, []);

  const history = useHistory();

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
    },
    surname: {
      isRequired: {
        message: "Фамилия обязательна для заполнения",
      },
    },
    yearOfBirth: {
      isRequired: {
        message: "Укажите год рождения",
      },
			isDigits: {
				message: "Поле заполнено некорректно",
			},
			isLength: {
				message: "Поле заполнено некорректно",
				value: 4,
			},
			isCorrectValue: {
				message: "Поле заполнено некорректно",
			}

    },
    portfolio: {
      isRequired: {
        message:
          "Поле Портфолио обязательно для заполнения",
      },
			isUrl: {
				message:
				"Поле заполнено некорректно. Укажите ссылку на портфолио",
			}
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    localStorage.setItem("student", JSON.stringify(data));
    alert("Изменено");
    history.push("/");
  };
  const handleBack = () => {
    history.push("/");
  };
if (data) {
  return (
    <>
      {isNew ? <h1>Создать</h1> : <h1>Изменить</h1>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Имя"
          name="name"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
        />
        <TextField
          label="Фамилия"
          name="surname"
          value={data.surname}
          onChange={handleChange}
          error={errors.surname}
        />
        <TextField
          label="Год рождения"
          name="yearOfBirth"
          value={data.yearOfBirth}
          onChange={handleChange}
          error={errors.yearOfBirth}
        />
        <TextField
          label="Портфолио"
          name="portfolio"
          value={data.portfolio}
          onChange={handleChange}
          error={errors.portfolio}
        />
        {!isNew ? (
          <button
            className="btn btn-secondary mr-4"
            type="button"
            onClick={handleBack}
            style={{ marginRight: "10px" }}>
            Назад
          </button>
        ) : (
          ""
        )}
        <button type="submit" className="btn btn-primary">
          {isNew ? "Создать" : "Изменить"}
        </button>
      </form>
    </>
  );
				}
				return "Загрузка..."
};

export default AddForm;
