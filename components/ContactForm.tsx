"use client";

import * as React from "react";

export default function ContactForm() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      className="rounded-xl border border-gray-200 p-6 shadow-soft"
      onSubmit={onSubmit}
      aria-describedby="form-note"
    >
      <div className="grid gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <button className="inline-flex items-center rounded-lg bg-gray-900 text-white px-4 py-2 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500">
          Send (demo)
        </button>
      </div>

      <p id="form-note" className="sr-only">
        This is a demo UI only; no messages are sent.
      </p>
    </form>
  );
}
