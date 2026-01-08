import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import PostInput from "../src/components/PostInput.jsx";

// mocks
vi.mock("../src/hooks/useAuth.jsx", () => ({
  useAuth: () => ({
    user: {
      userName: "testUser",
      profilePic: {
        data: "testProfilePic.png",
      },
    },
  }),
}));

vi.mock("../src/api/posts.js", () => ({
  createPost: vi.fn(),
}));

import { createPost } from "../src/api/posts.js";

describe("PostInput", () => {
  test("renders correctly", () => {
    render(<PostInput />);

    expect(
      screen.getByPlaceholderText(`What's on your mind?`)
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Post" })).toBeDisabled();
  });

  test("post button is enabled when text is entered", async () => {
    render(<PostInput />);

    const input = screen.getByPlaceholderText(`What's on your mind?`);
    await userEvent.type(input, "test"); // await so react state updates

    expect(screen.getByRole("button", { name: "Post" })).toBeEnabled();
  });

  test("submits post and calls addImmediately", async () => {
    const addImmediately = vi.fn();
    createPost.mockResolvedValue({ _id: "testId", content: "test post" });

    render(<PostInput addImmediately={addImmediately} />);

    const input = screen.getByPlaceholderText(`What's on your mind?`);
    const button = screen.getByRole("button", { name: "Post" });

    await userEvent.type(input, "test");
    await userEvent.click(button);

    const { user } = await import("../src/hooks/useAuth.jsx").then((mod) =>
      mod.useAuth()
    );
    expect(createPost).toHaveBeenCalledWith("test", user);
    expect(addImmediately).toHaveBeenCalledWith({
      _id: "testId",
      content: "test post",
    });
  });
});
