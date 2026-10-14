import { Coins, Dices, ScrollText } from "lucide-react";

import { Avatar, AvatarFallback } from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

import HomeSectionHeader from "@/app/(public)/_components/home-section-header";
import { HOME_HOW_IT_WORKS_STEPS } from "@/app/(public)/_constants/home";

const ICONS = [ScrollText, Dices, Coins];

export default function HomeHowItWorks() {
  return (
    <section aria-labelledby="how-it-works" className="flex flex-col gap-4">
      <HomeSectionHeader
        id="how-it-works"
        title="How it works"
        description="Three steps from stranger to legend."
      />
      <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {HOME_HOW_IT_WORKS_STEPS.map((step, index) => {
          const Icon = ICONS[index];
          return (
            <li key={step.title}>
              <Card className="h-full">
                <CardHeader className="gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 after:hidden">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <Icon aria-hidden className="size-5" />
                      </AvatarFallback>
                    </Avatar>
                    <Badge variant="outline">Step {index + 1}</Badge>
                  </div>
                  <CardTitle
                    role="heading"
                    aria-level={3}
                    className="font-heading text-lg"
                  >
                    {step.title}
                  </CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
