import { FC, useState } from "react";
import { Form, Input, Button, Checkbox, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { MD5 } from "crypto-js";

const { Title } = Typography;

interface Values {
  username: string;
  password: string;
  remember: boolean;
}

const LoginForm: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (values: Values) => {
    const { username, password, remember } = values;
    if (!username || !password) {
      alert("Please input your username and password");
      return;
    }
    const encryptedPassword = MD5(password).toString();
    if (
      username === "admin" &&
      encryptedPassword === "25d55ad283aa400af464c76d713c07ad"
    ) {
      if (remember) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      }
      navigate("/admin");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 400 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Title level={2}>Login</Title>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Log in
            </Button>
            Don't have an account{" "}
            <a href="#">sign up</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
