import React from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

type Props = PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>;

const Login: React.FC<Props> = (props) => {
  const { kcContext } = props;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] =
    React.useState(false);

  const onSubmit = useConstCallback<React.FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();

      setIsLoginButtonDisabled(true);

      const $form = e.target as HTMLFormElement;
      $form
        .querySelector("input[name='email']")
        ?.setAttribute("name", "username");
      $form.submit();
    }
  );

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form
            id={"kc-form-login"}
            onSubmit={onSubmit}
            action={kcContext.url.loginAction}
            method={"post"}
          >
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input name={"username"} type="text" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input name={"password"} type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  {kcContext.realm.rememberMe && (
                    <Checkbox>Remember me</Checkbox>
                  )}
                  {kcContext.realm.resetPasswordAllowed && (
                    <Link color={"blue.400"}>Forgot password?</Link>
                  )}
                </Stack>
                <Button
                  type={"submit"}
                  name={"login"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
