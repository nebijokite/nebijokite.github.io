

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

