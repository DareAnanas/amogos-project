import React from "react";
import { Link } from "react-router-dom";

function Description() {
    return (
        <>
            <div className="register volunteer">
              <h3>Зареєструватися як волонтер:</h3>
              <ul className="volunteer-description">
                <li>Публікація оголошень про передачу тварин до притулку
                </li>
                <li>Перегляд оголошень та подача заяв на адопцію тварин із притулків
                </li>
                <li>Комунікація з представниками притулків</li>
                <li>Благодійна діяльність (збори коштів, пожертвування)</li>
              </ul>
              <Link to="/register-shelter">Зареєструватися</Link>
            </div>
            <div className="register shelter">
            <h3>Зареєструвати акаунт притулку:</h3>
            <ul className="shelter-description">
                <li>Публікація оголошень про тварин, доступних до адопції
                </li>
                <li>Об’єднання зусиль і взаємодія
                з іншими закладами(притулками, вет-клініками)
                </li>
                <li>Координація і співпраця з волонтерами</li>
                <li>Благодійна діяльність (збори коштів, пожертвування)</li>
              </ul>
              <Link to="/register-shelter">Зареєструватися</Link>
            </div>
        </>
    );
}

export default Description;