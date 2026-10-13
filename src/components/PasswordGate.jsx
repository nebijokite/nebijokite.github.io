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
