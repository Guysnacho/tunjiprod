type AuthRequest = {
  client_id: string;
  response_type: "code";
  redirect_uri: string;
  request_id: string;
  scope: string[];
  show_dialog: false;
};

type AuthedAdmin = {
  code: string;
  request_id: string;
};

export type { AuthRequest, AuthedAdmin };
