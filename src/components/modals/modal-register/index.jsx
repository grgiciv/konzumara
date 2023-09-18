import {
  Modal,
  Button,
  Title,
  TextInput,
  Stack,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export default function RegisterModal({ isOpened, onClose }) {
  const form = useForm({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAdmin: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

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
            <TextInput
              value={form?.values.password}
              placeholder="Your password"
              label="Enter your password:"
              required
              {...form.getInputProps("password")}
            />
            <TextInput
              value={form?.values.password}
              placeholder="Enter your password again"
              label="Re-enter your password:"
              required
              {...form.getInputProps("confirmPassword")}
            />
            <Checkbox color="green" label="Register as administrator" />
            <Button type="submit">Register</Button>
          </form>
        </Stack>
      </Modal>
    </>
  );
}
