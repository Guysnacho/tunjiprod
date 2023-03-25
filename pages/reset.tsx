import {
  Alert,
  Button,
  Container,
  FormControl,
  Paper,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const emailVal = new RegExp("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$");

/**
 * @function Reset
 * @fileoverview Password reset thingy
 */
const Reset: NextPage = () => {
  //Media query to check if we're below md viewport width
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  // App state
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [superSecret, setSuperSecret] = useState("");
  const [correct, setCorrect] = useState(false);
  const [token, setToken] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // App functions
  const handleReset = () => {
    if (email) {
      setLoading(true);
      supabase.auth.resetPasswordForEmail(email).then((res) => {
        if (res.data != null) {
          setSuccessMessage("You know what to do :)");
        } else if (res.error) {
          console.error("You got an error - " + res.error.message);
          setErrorMessage(res.error.message);
          setEmail("");
        }
      });
    } else {
      setErrorMessage("You didn't fill everything in");
      setEmail("");
    }
    setLoading(false);
  };

  const handleOTP = () => {
    if (token) {
      setLoading(true);
      supabase.auth
        .verifyOtp({ email, token, type: "recovery" })
        .then((res) => {
          if (res.data.user != null) {
            supabase.auth.updateUser({ password: password }).then((updated) => {
              updated.error
                ? setErrorMessage(updated.error.message)
                : router.push("/admin", { query: { how: "recovery" } });
            });
          } else if (res.error) {
            console.error("You got an error - " + res.error.message);
            setErrorMessage(res.error.message);
          }
        });
    }
    setToken("");
    setLoading(false);
  };

  useEffect(() => {
    if (superSecret == process.env.NEXT_PUBLIC_RESET) setCorrect(true);
  }, [superSecret]);

  return (
    <>
      <Head>
        <title>Password Reset | Tunji Productions</title>
        <meta name="description" content="Of course you forgot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        component={Paper}
        sx={{
          width: matches ? "90vw" : "40vw",
          m: "auto",
          py: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FormControl>
          <Stack spacing={4} direction="column" my="auto">
            {errorMessage !== "" ? (
              <Alert severity="error">
                {"Oops, something went wrong - " + errorMessage}
              </Alert>
            ) : (
              <></>
            )}
            {successMessage !== "" ? (
              <Alert severity="success">
                {"Please check your email for a confirmation"}
              </Alert>
            ) : undefined}
            {correct ? (
              successMessage ? (
                <>
                  <TextField
                    id="outlined-OTP-input"
                    variant="outlined"
                    label="SuperDuperSecretCode"
                    type="password"
                    error={token.length != 6}
                    value={token}
                    onChange={(e) => {
                      setToken(e.target.value);
                    }}
                    disabled={loading}
                    required
                  />
                  <Button
                    variant="outlined"
                    aria-label="login"
                    onClick={handleOTP}
                    disabled={token.length != 6}
                  >
                    {"Reset Password"}
                  </Button>
                </>
              ) : (
                <>
                  <TextField
                    id="outlined-email-input"
                    variant="outlined"
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
                    variant="outlined"
                    label="New Password"
                    type="password"
                    error={password.length < 6}
                    autoComplete="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    disabled={loading}
                    required
                  />
                  <Button
                    variant="outlined"
                    aria-label="login"
                    onClick={handleReset}
                    disabled={!email}
                  >
                    {"Reset Password"}
                  </Button>
                </>
              )
            ) : (
              <TextField
                id="outlined-password-input"
                variant="outlined"
                label="SuperSecretCode"
                type="password"
                value={superSecret}
                onChange={(e) => {
                  setSuperSecret(e.target.value);
                }}
                required
              />
            )}
          </Stack>
        </FormControl>
      </Container>
    </>
  );
};

export default Reset;
