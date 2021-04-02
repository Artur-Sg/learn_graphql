interface EnvironmentType {
  production: boolean;
  apiKey: string;
  uri: string;
}

export type Environment = Readonly<EnvironmentType>;
