import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { LOGIN_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../utils/hooks";
import { AuthContext } from "../../utils/auth";

export default function Login(props) {

  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(userLogin, {
    username: "",
    password: ""
  });

  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(_, {data: {login: userData }}) {
      context.login(userData)
      props.history.push("/");
    },
    onError(err) {
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.errors
          : {}
      );
    },
    variables: values,
  });

  function userLogin() {
    login();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
            error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
            error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
