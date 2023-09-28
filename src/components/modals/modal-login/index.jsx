import {
  Modal,
  Button,
  Title,
  TextInput,
  Stack,
  PasswordInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { LOGIN_SCHEMA } from "../../../schema";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import supabase from "../../../config/supabase";

export default function LogInModal({ isOpened, onClose }) {
  const { signIn, setUser } = useContext(AuthContext);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: yupResolver(LOGIN_SCHEMA),
  });

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.values.email,
      password: form.values.password,
    });
    if (data) {
      setUser(data);
      onClose();
    }
  };

  return (
    <>
      <Modal opened={isOpened} onClose={onClose} centered>
        <Title order={1} color="#FF8A65">
          Log in
        </Title>
        <Stack spacing="xl">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              value={form?.values.email}
              placeholder="Your email"
              label="Enter your mail:"
              required
              {...form.getInputProps("email")}
            />
            <PasswordInput
              value={form?.values.password}
              placeholder="Your password"
              label="Enter your password:"
              required
              {...form.getInputProps("password")}
            />
            <Button type="submit" onClick={handleLogin}>
              Log in
            </Button>
          </form>
        </Stack>
      </Modal>
    </>
  );
}
