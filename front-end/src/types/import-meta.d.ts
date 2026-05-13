interface ImportMeta {
  readonly env: {
    readonly NG_APP_API_URL: string;
    readonly NG_APP_API_KEY: string;
    [key: string]: string | undefined;
  };
}
