interface AccessTokenPayload {
  sub: number;
  username: string;
}

interface RefreshTokenPayload extends AccessTokenPayload {
  passwordHash: string;
}

export { AccessTokenPayload, RefreshTokenPayload };
