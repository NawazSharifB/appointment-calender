export interface DataStoreResponse {
  isSuccessful: Boolean;
  errorStates?: {
    key: string;
    message: string;
  }[];
}
