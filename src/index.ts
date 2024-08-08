export const startSignUpFlow = () => ({
  verifyEmail: () => ({
    checkPasswordRequirements: (options: {
      minLength: true;
      hasSpecialChar: true;
    }) => ({
      hashPassword: (options: { usedArgon2id: true }) => ({
        storeUserData: (options: { usedPreparedStatements: true }) => ({
          sendVerificationEmail: (options: { usedSecureLink: true }) => ({
            completeSignup: () => ({
              isComplete: true,
            }),
          }),
        }),
      }),
    }),
  }),
});
