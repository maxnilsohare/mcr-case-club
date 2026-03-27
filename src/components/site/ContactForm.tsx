"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const types = useMemo(
    () =>
      [
        { value: "student", label: "Student inquiry" },
        { value: "partner", label: "Partner / sponsor inquiry" },
        { value: "other", label: "Other" }
      ] as const,
    []
  );

  return (
    <form
      className="rounded-2xl border border-ink-200 bg-white px-5 py-6 sm:px-6"
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("sent");
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="fullName" placeholder="Your name" required />
        <Field
          label="Email"
          name="email"
          placeholder="you@university.edu"
          type="email"
          required
        />
        <div className="sm:col-span-2">
          <Field label="Subject" name="subject" placeholder="How can we help?" required />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-ink-900">
            Type (optional)
          </label>
          <select
            name="type"
            className="mt-2 h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-sm text-ink-950 outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40"
            defaultValue="student"
          >
            {types.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-ink-900">Message</label>
          <textarea
            name="message"
            required
            rows={6}
            className="mt-2 w-full resize-none rounded-xl border border-ink-200 bg-white px-3 py-3 text-sm text-ink-950 outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40"
            placeholder="Share context, what you’re looking for, and any timelines."
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-700">
          MVP note: this form is frontend-only (no email sending yet).
        </p>
        <Button type="submit" variant="primary" size="sm">
          {status === "sent" ? "Received (placeholder)" : "Send message"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink-900" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-sm text-ink-950 outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40"
        placeholder={placeholder}
      />
    </div>
  );
}

