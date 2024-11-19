import { auth, clerkClient } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquirePlanButton from "./_components/acquire-plan-button";
import { Badge } from "../_components/ui/badge";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect(`/login`);
  }

  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user?.publicMetadata?.subscriptionPlan === 'premium';

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <h1 className="font-bold text-2xl">Subscription</h1>

        <div className="flex gap-6">
          {/* BASIC PLAN: */}
          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8 relative">
              {!hasPremiumPlan && <Badge className="absolute left-4 top-6 bg-primary/10 text-primary text-base">Active</Badge>}
              <h2 className="text-center text-2xl font-semibold">
                Basic Plan
              </h2>
              <div className="flex items-center gap-3 justify-center">
                <span className="text-4xl">R$</span>
                <span className="font-semibold text-6xl">0</span>
                <span className="text-2xl text-muted-foreground">/month</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Only 10 transactions per monthn (7/10)</p>
              </div>

              <div className="flex items-center gap-2">
                <XIcon />
                <p>AI Reports</p>
              </div>
            </CardContent>
          </Card>

          {/* PRO PLAN: */}
          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8 relative">
              {hasPremiumPlan && <Badge className="absolute left-4 top-6 bg-primary/10 text-primary text-base">Active</Badge>}
              <h2 className="text-center text-2xl font-semibold">
                Premium Plan
              </h2>
              <div className="flex items-center gap-3 justify-center">
                <span className="text-4xl">R$</span>
                <span className="font-semibold text-6xl">19</span>
                <span className="text-2xl text-muted-foreground">/month</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>UNLIMITED transactions</p>
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>AI Reports</p>
              </div>

              <AcquirePlanButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
};

export default SubscriptionPage;
