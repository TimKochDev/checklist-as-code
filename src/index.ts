/* eslint-disable @typescript-eslint/no-unused-vars */

export const startSignUpWithEmailAndPasswordChecklist = (options: {
  /**
   * Especially useful if you send emails to the users trying to sign up. Can be
   * exploited.
   */
  considerRateLimit: true;
}) => ({
  validateEmailAddress: (options: {
    /**
     * Validating email addresses is a long debated topic. You might just want
     * to check if an @ exists with at least 1 character on each side.
     */
    validateEmailAddressFormat: true;

    /**
     * Depending on your use case, you might want to make sure that the email
     * address really exists. In this case, send a verifying email to this
     * address.
     */
    considerVerifyingEmailAddress: true;
  }) => ({
    checkPasswordRequirements: (options: {
      requireAtLeastEightCharacters: true;
      /**
       * Do not set the maximum password length too low. Anywhere around 64-256
       * characters is a good maximum.
       */
      allowLongPasswords: true;
      /**
       * Do not silently modify or truncate the input. All valid Unicode
       * characters should be allowed, including whitespace.
       */
      doNotModifyInput: true;

      /**
       * Use libraries like zxcvbn to check for weak passwords. Detect leaked
       * passwords with APIs such as haveibeenpwned.
       */
      checkForWeakPasswords: true;
    }) => ({
      /**
       * Argon2id should be your first choice for hashing passwords, followed by
       * Scrypt and Bcrypt. Hashing is by definition computationally expensive
       * so you should use the most performant option for your runtime.
       *
       * - For Node.js we recommend using @node-rs/argon2.
       * - For Bun, we recommend using Bun.password.
       * - Use Deno-specific packages for Deno.
       * - For other runtimes (e.g. Cloudflare Workers), your choice is very
       *   limited. @noble/hashes provides pure-js implementations of various
       *   hashing algorithms, but because it's written in JS, you may hit into
       *   CPU limitations of your service. If possible, avoid these runtimes
       *   when you need to hash passwords.
       */
      hashPassword: (options: { useRecommendedMinimumParameters: true }) => ({
        storeUserData: (options: {
          storePasswordHash: true;
          doNotStorePlainTextPassword: true;
        }) => ({
          completed: () => undefined,
        }),
      }),
    }),
  }),
});
