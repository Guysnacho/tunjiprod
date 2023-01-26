type AuthRequest = {
  client_id: string;
  response_type: "code";
  redirect_uri: string;
  request_id: string;
  scopes: string[];
  show_dialog: boolean;
};

export default AuthRequest;
