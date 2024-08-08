import { startSignUpFlow } from "./index";

describe("SignUpFlow", () => {
  it("should complete the sign-up process", () => {
    const flow = startSignUpFlow();
    const result = flow
      .verifyEmail({ checkedThatAtSignIsSet: true })
      .checkPasswordRequirements({ minLength: true, hasSpecialChar: true })
      .hashPassword({ usedArgon2id: true })
      .storeUserData({ usedPreparedStatements: true })
      .sendVerificationEmail({ usedSecureLink: true })
      .completeSignup();

    expect(result.isComplete).toBe(true);
  });
});
