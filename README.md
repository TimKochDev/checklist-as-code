> [!WARNING]
> Note that this package is still in an experimental stage while I figure out if it serves the right purpose.

Securing your app is hard.
But there is a ton of information out there to help you
(e.g. [OWASP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html),
[Copenhagen Book](https://thecopenhagenbook.com/))
However, it is easy to overlook details when switching contexts between the tutorials and your code.
Use this package to add a checklist to your codebase to ensure you have covered all the bases.
And if some security advices change in the future, you will be notified by the type errors in your code.

The code itself does exactly nothing - no validation, no hashing, no storing, no side effects.
It only provides a version controlled checklist in your codebase that gets outdated when the security recommendations change.

### Usage

I recommend adding the following code to the top of your code file that handles the sign-up process.

```typescript
import { startSignUpWithEmailAndPasswordChecklist } from "checklist-as-code";

startSignUpWithEmailAndPasswordChecklist({
  considerRateLimit: true,
})
  .validateEmailAddress({
    considerVerifyingEmailAddress: true,
    validateEmailAddressFormat: true,
  })
  .checkPasswordRequirements({
    allowLongPasswords: true,
    checkForWeakPasswords: true,
    doNotModifyInput: true,
    requireAtLeastEightCharacters: true,
  })
  .hashPassword({
    useRecommendedMinimumParameters: true,
  })
  .storeUserData({
    doNotStorePlainTextPassword: true,
    storePasswordHash: true,
  })
  .completed();
```

Note that most methods and options are documented.
So just hover over them in your IDE to get more information.
