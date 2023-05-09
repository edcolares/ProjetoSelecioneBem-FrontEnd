import React, { useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('Campo e-mail é obrigatório'),
  password: Yup.string().min(6, 'Senha precisa ter pelo menos 6 caracteres').required('Campo senha é obrigatório'),
});


const App = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        // Aqui você pode enviar os dados do formulário para o servidor
        console.log(values);
      })
      .catch((validationErrors) => {
        const newErrors = {};

        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });

        setErrors(newErrors);
      });
  };

  return (
    <div>
      <h1>Formulário de cadastro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input type="text" name="name" value={values.name} onChange={handleChange} />
          {errors.name && <div>{errors.name}</div>}
        </div>

        <div>
          <label htmlFor="email">E-mail:</label>
          <input type="email" name="email" value={values.email} onChange={handleChange} />
          {errors.email && <div>{errors.email}</div>}
        </div>

        <div>
          <label htmlFor="password">Senha:</label>
          <input type="password" name="password" value={values.password} onChange={handleChange} />
          {errors.password && <div>{errors.password}</div>}
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default App;
