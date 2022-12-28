import {
  Alert,
  Box,
  Button,
  Drawer,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { Dispatch, SetStateAction, useState } from "react";
import { authCodes } from "../../lib/constants";
import { supabase } from "../../lib/supabaseClient";

const emailVal = new RegExp("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$");

/**
 * @fileoverview Auth component for handling logins and admin redirects
 * @function Auth
 */
const Auth = (props: {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleLogin = async (
    type: string = authCodes.SIGNUPREQUEST,
    email: string,
    password: string
  ) => {
    setLoading(true);
    if (type === authCodes.REDIRECT) {
      router.replace("/admin");
      setLoading(false);
      props.setOpened(false);
      return;
    } else if (
      type === authCodes.SIGNUPREQUEST &&
      !!process.env.NEXT_PUBLIC_ALLOWSIGNUP
    ) {
      alert("Nice try, no sign-ups rn");
    }
    try {
      const {
        error,
        data: { user },
      } =
        type === authCodes.AUTHREQUEST
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({ email, password });
      if (!error && user) {
        setSuccessMessage("Ladies and gents, we're in");
      }
      if (error) setErrorMessage(error.message);
    } catch (error) {
      setErrorMessage("Something went catastrophically wrong. Sorry :)");
    }
    setLoading(false);
  };

  return (
    <Drawer
      open={props.opened}
      onClose={() => props.setOpened(false)}
      anchor="bottom"
    >
      <FormControl sx={{ py: 5, mx: "auto", width: "75%" }}>
        <Stack spacing={4} direction="column" my="auto">
          {errorMessage !== "" ? (
            <Alert severity="error">
              {"Oops, something went wrong - \n" + errorMessage}
            </Alert>
          ) : (
            <></>
          )}
          {successMessage !== "" ? (
            <Alert severity="success">{successMessage}</Alert>
          ) : (
            <>
              <TextField
                id="outlined-email-input"
                variant="filled"
                label="Email"
                type="email"
                error={!emailVal.test(email)}
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                disabled={loading}
                required
              />
              <TextField
                id="outlined-password-input"
                variant="filled"
                label="Password"
                type="password"
                auto-complete="current-password"
                error={password.length < 6}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                disabled={loading}
                required
              />
            </>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              variant="text"
              aria-label="login"
              onClick={() =>
                handleLogin(authCodes.AUTHREQUEST, email, password)
              }
              disabled={!(email && password) || !!successMessage}
            >
              Sign In
            </Button>
            <Button
              variant="text"
              aria-label="login"
              onClick={() => handleLogin(authCodes.REDIRECT, email, password)}
              disabled={!(email && password)}
            >
              {successMessage ? "Come In" : "Sign Up"}
            </Button>
          </Box>
        </Stack>
      </FormControl>
    </Drawer>
  );
};

export default Auth;
