import React from "react";
import { Button } from '../antdComponents'

const SignInButton2 = () => {

  return (
    <Button
      variant="solid"
      color="primary"
      style={{
        backgroundColor: "var(--nav)",
        borderRadius: 8,
        paddingBlock: 20,
        paddingInline: 30,
      }}
    >
        <a href="/auth/google/">
          <h3>Sign-In</h3>
        </a>
    </Button>
  );

};

export default SignInButton2;