import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const StudentCard = () => {
  const [student,] = useState(JSON.parse(localStorage.getItem("student")) || undefined);
  const [isExist,] = useState(student !== undefined ? true : false);

  const history = useHistory();

  const handleChange = () => {
    history.push("/edit");
  };

  const year = (number) => {
    if (number % 10 === 1 && number !== 11) {
      return "год";
    }
    if (
      (number % 10 === 2 && number !== 12) ||
      (number % 10 === 3 && number !== 13) ||
      (number % 10 === 4 && number !== 14)
    ) {
      return "года";
    }
    return "лет";
  };


 
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-5 shadow">
          <h1>Карточка студента</h1>
          {isExist === false ? (
            <p>Нет данных</p>
          ) : (
            <>
              <div className="mb-2">Имя: {student?.name}</div>
              <div className="mb-2">Фамилия: {student?.surname}</div>
              <div className="mb-2">
                Год рождения: {student?.yearOfBirth} (
                {new Date().getFullYear() -
                  student?.yearOfBirth +
                  " " +
                  year(new Date().getFullYear() - student?.yearOfBirth)}{" "}
                )
              </div>
              <div className="mb-4">
                Портфолио:{" "}
                <a href={student?.portfolio} target="_blank" rel="noreferrer">
                  {student?.portfolio}
                </a>
              </div>
            </>
          )}
          <button onClick={handleChange} className="btn btn-primary">
            {isExist === false ? "Добавить" : "Изменить"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
