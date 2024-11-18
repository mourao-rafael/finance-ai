import Image from "next/image";
import React from "react"
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";

const LoginPage = (props) => {
  return (
    <div className="grid grid-cols-2 h-full">
      {/* LEFT COLLUMN: */}
      <div className="flex h-full flex-col justify-center p-8 max-w-[550px] mx-auto">
        <Image src="/logo.svg" alt="Finance AI Logo" width={173} height={39} className="mb-8" />
        <h1 className="text-4xl font-bold mb-3">Bem-vindo</h1>
        <p className="text-muted-foreground mb-8">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas movimentações, e oferecer insights personalizados, facilitando o controle do seu orçamento.
        </p>
        <Button variant="outline">
          <LogInIcon className="mr-2" />
          Sign in/up
        </Button>
      </div>

      {/* RIGHT COLLUMN: */}
      <div className="relative w-full h-full">
        <Image src="/login.png" alt="Sign in" fill className="object-cover" />
      </div>
    </div>
  )
};

export default LoginPage;
