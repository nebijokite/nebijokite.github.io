<<<<<<< HEAD
import { useState } from "react";

/**
 * ВНИМАНИЕ: это прототип. Пароль лежит в клиентском бандле, его можно достать
 * через DevTools — это НЕ защита. Для реальной защиты коммерческого проекта
 * проверку нужно перенести на backend: отправлять пароль на сервер (POST),
 * а сам контент кейса отдавать только после успешной проверки (по токену/сессии).
 * Достаточно заменить функцию `verify` ниже на fetch к API.
 */
async function verify(project, value) {
  return value === project.password;
}

export default function PasswordGate({ project, onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!value.trim()) return setError("Введите пароль");
    setLoading(true);
    setError("");
    const ok = await verify(project, value);
    setLoading(false);
    if (ok) onUnlock();
    else setError("Неверный пароль. Попробуйте ещё раз.");
  };

  return (
    <form className="gate" onSubmit={submit} noValidate>
      <h3 className="gate__title">Проект закрыт</h3>
      <p className="gate__text">Введите пароль, чтобы посмотреть кейс.</p>
      <label className="sr-only" htmlFor="gate-pass">Пароль</label>
      <input
        id="gate-pass"
        className="gate__input"
        type="password"
        value={value}
        autoComplete="off"
        aria-invalid={!!error}
        aria-describedby={error ? "gate-error" : undefined}
        onChange={(e) => { setValue(e.target.value); setError(""); }}
        placeholder="Пароль"
      />
      <button className="gate__btn" type="submit" disabled={loading}>
        {loading ? "Проверяем…" : "Открыть"}
      </button>
      {error && <p id="gate-error" className="gate__error" role="alert">{error}</p>}
    </form>
  );
}
=======


import { useState } from "react";

function PasswordGate({ project, onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    if (password === project.password) {
      onSuccess();
      setIsSubmitting(false);
      return;
    }

    setError("Пароль не подошёл. Попробуйте ещё раз.");
    setPassword("");
    setIsSubmitting(false);
  };

  return (
    <div className="password-gate">
      <div className="password-gate__content">
        <div className="password-gate__topline">
          <span className="password-gate__label">
            PRIVATE ACCESS
          </span>

          <span className="password-gate__index">
            PROJECT / 0{project.id?.slice(-1) || "1"}
          </span>
        </div>

        <div className="password-gate__symbol" aria-hidden="true">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="8"
              y="21"
              width="32"
              height="23"
              rx="5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M15 21V14a9 9 0 0 1 18 0v7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="24" cy="31" r="2.5" fill="currentColor" />
            <path
              d="M24 33.5V37"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h3 className="password-gate__title">
          Доступ
          <br />
          <span>ограничен.</span>
        </h3>

        <p className="password-gate__description">
          Этот проект доступен по паролю.
          Введите код доступа, чтобы посмотреть материалы.
        </p>

        <form
          className="password-gate__form"
          onSubmit={handleSubmit}
        >
          <label
            className="password-gate__field-label"
            htmlFor={`project-password-${project.id}`}
          >
            КОД ДОСТУПА
          </label>

          <div
            className={`password-gate__input-wrap ${
              error ? "password-gate__input-wrap--error" : ""
            }`}
          >
            <input
              id={`project-password-${project.id}`}
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              placeholder="Введите пароль"
              autoComplete="current-password"
              aria-invalid={Boolean(error)}
              aria-describedby={
                error ? `password-error-${project.id}` : undefined
              }
              required
            />

            <span
              className="password-gate__input-mark"
              aria-hidden="true"
            >
              ↗
            </span>
          </div>

          {error && (
            <p
              className="password-gate__error"
              id={`password-error-${project.id}`}
              role="alert"
            >
              <span className="password-gate__error-dot" />
              {error}
            </p>
          )}

          <button
            className="password-gate__submit"
            type="submit"
            disabled={!password.trim() || isSubmitting}
          >
            <span>
              {isSubmitting ? "Проверка..." : "Открыть проект"}
            </span>

            <span
              className="password-gate__submit-arrow"
              aria-hidden="true"
            >
              ↗
            </span>
          </button>
        </form>

        <div className="password-gate__footer">
          <span className="password-gate__footer-dot" />
          <span>Закрытые материалы</span>
          <span className="password-gate__footer-line" />
          <span>Maison Obscura</span>
        </div>
      </div>
    </div>
  );
}

export default PasswordGate;

>>>>>>> 67d56fc93b8702593fe1db63d11206050054a884
