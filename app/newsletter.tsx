"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Newsletter() {
  const [sent, setSent] = useState(false);

  // Posts nowhere yet. Send the address to your mailing list provider here.
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <p className="text-lede text-foreground-2" role="status">
        Thanks. We will write when there is news.
      </p>
    );
  }

  return (
    <form className="grid max-w-[26rem] justify-items-start gap-2 max-sm:max-w-none" onSubmit={submit}>
      <Label htmlFor="email" className="text-[0.9375rem] font-normal text-foreground">
        Email
      </Label>
      <Input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="you@example.com"
        className="h-11 bg-card text-base"
      />
      <p className="mb-2 text-[0.9375rem]">I agree that my personal data will be processed for this purpose.</p>
      <Button type="submit" size="lg" className="h-11 rounded-full px-5 text-base max-sm:w-full">
        Submit
      </Button>
    </form>
  );
}
