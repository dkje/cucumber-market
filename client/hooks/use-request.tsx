import axios from "axios";
import { useState } from "react";

interface UseRequestProps {
  url: string;
  method: "post" | "get" | "update" | "delete" | "put";
  body?: any;
  onSuccess(): void;
}

const useRequest = ({ url, method, body, onSuccess }: UseRequestProps) => {
  const [errors, setErrors] = useState<React.ReactNode | null>(null);

  const doRequest = async () => {
    try {
      await axios[method](url, body);
      onSuccess();
    } catch (err) {
      console.log(err);
      setErrors(
        <div className="alert alert-danger">
          <h4>다시 시도해주세요</h4>
          <ul className="my-0">
            {err.response.data.errors &&
              err.response.data.errors.map(
                ({ message }: { message: string }) => (
                  <li key={message}>{message}</li>
                )
              )}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
export default useRequest;
