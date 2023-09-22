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

export default function RegisterModal({ isOpened, onClose }) {
  const form = useForm({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAdmin: false,
    },

    validate: yupResolver(REGISTER_SCHEMA),
  });

  function handleRegister() {}

  return (
    <>
      <Modal opened={isOpened} onClose={onClose} centered>
        <Title order={1} color="#FF8A65">
          Register
        </Title>
        <Stack spacing="xl">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              value={form?.values.fullName}
              placeholder="Your full name"
              label="Enter your full name:"
              required
              {...form.getInputProps("fullName")}
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
              color="green"
              label="Register as administrator"
              {...form.getInputProps("isAdmin")}
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
