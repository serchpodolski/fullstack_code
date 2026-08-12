import SignInContainer from "../components/Signin/SignInContainer";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("is defined", async () => {
      await expect(SignInContainer).toBeDefined();
    });

    it("can call onSubmit", async () => {
      const onSubmit = jest.fn();
      await waitFor(() => render(<SignInContainer onSubmit={onSubmit} />));
      await waitFor(() => fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle'));
      await waitFor(() => fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password'));
      await waitFor(() => fireEvent.press(screen.getByText('Sign In')));
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({ username: 'kalle', password: 'password' });
    });
  });
});