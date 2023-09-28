import {
  Modal,
  Button,
  Title,
  TextInput,
  Stack,
  Checkbox,
  PasswordInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { REGISTER_SCHEMA } from "../../../schema";
import supabase from "../../../config/supabase";
import { useToggle } from "@mantine/hooks";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

export default function RegisterModal({ isOpened, onClose }) {
  const [admin, setAdmin] = useToggle([false, true]);
  const userValues = useContext(AuthContext);
  console.log(typeof userValues, "ASDAAF");

  const form = useForm({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      is_admin: false,
    },

    validate: yupResolver(REGISTER_SCHEMA),
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    let { data, error } = await supabase.auth.signUp({
      email: form.values.email,
      password: form.values.password,
      options: {
        data: {
          full_name: form.values.full_name,
          is_admin: form.values.is_admin,
        },
      },
    });
    form.reset();
    if (error) {
      console.log("error je", error);
    }
    if (data) {
      console.log("data je", data);
    }
    onClose();
  };

  return (
    <>
      <Modal opened={isOpened} onClose={onClose} centered>
        <Title order={1} color="#FF8A65">
          Register
        </Title>
        <Stack spacing="xl">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              value={form?.values.full_name}
              placeholder="Your full name"
              label="Enter your full name:"
              required
              {...form.getInputProps("full_name")}
            />
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
            <PasswordInput
              value={form?.values.password}
              placeholder="Enter your password again"
              label="Re-enter your password:"
              required
              {...form.getInputProps("confirmPassword")}
            />
            <Checkbox
              value={admin}
              color="green"
              onClick={setAdmin}
              label="Register as administrator"
              {...form.getInputProps("is_admin")}
            />
            <Button type="submit" onClick={handleRegister}>
              Register
            </Button>
          </form>
        </Stack>
      </Modal>
    </>
  );
}
