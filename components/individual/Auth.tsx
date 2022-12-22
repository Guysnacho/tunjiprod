import {
  Drawer,
  FormControl,
  Stack,
  Alert,
  TextField,
  Button,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
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

  const handleLogin = async () => {
    setLoading(true);
    if (user?.data.session === null) {
      // Auth check
      await supabase.auth
        .signInWithPassword({ email: email, password: password })
        .then((res) =>
          res.data.session?.access_token
            ? setSuccessMessage("Ladies and gents, we're in")
            : res.error?.message
            ? setErrorMessage(res.error.message)
            : undefined
        );
    } else {
      setSuccessMessage("You're already authed");
    }
    setTimeout(() => {}, 5000);
    setLoading(false);
  };

  // Check if already logged in
  const { data: user } = useQuery(["userData"], () =>
    supabase.auth.getSession()
  );

  useEffect(() => {
    console.log(user);
  }, [user]);

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
          <Button
            variant="text"
            aria-label="login"
            onClick={handleLogin}
            disabled={!(email && password)}
          >
            Sign In
          </Button>
        </Stack>
      </FormControl>
    </Drawer>
  );
};

export default Auth;
