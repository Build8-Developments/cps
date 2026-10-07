import { defineField, defineType } from "sanity";
import { languageField, slugField, statusField } from "../objects/shared";

export const client = defineType({
  name: "client",
  title: "Client",
  type: "document",
  fields: [
    languageField,
    statusField,
    defineField({ name: "name", type: "string", title: "Name", validation: (Rule) => Rule.required() }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "logoUrl",
      type: "string",
      title: "Logo URL / path (seed / fallback)",
      description: "Absolute URL or site path such as /clients/neom.svg",
    }),
    defineField({
      name: "logoMobile",
      type: "image",
      title: "Logo (phone)",
      description: "Optional artwork shown below 768px. Falls back to the main logo.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "logoMobileUrl",
      type: "string",
      title: "Logo (phone) URL / path (seed / fallback)",
    }),
    defineField({ name: "url", type: "url", title: "Website" }),
    defineField({ name: "order", type: "number", title: "Sort order", initialValue: 0 }),
  ],
  preview: {
    select: { title: "name", media: "logo", language: "language" },
    prepare: ({ title, media, language }) => ({
      title,
      subtitle: language?.toUpperCase(),
      media,
    }),
  },
});

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    languageField,
    defineField({ name: "title", type: "string", title: "Title", validation: (Rule) => Rule.required() }),
    slugField,
  ],
  preview: {
    select: { title: "title", language: "language" },
    prepare: ({ title, language }) => ({ title, subtitle: language?.toUpperCase() }),
  },
});

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    languageField,
    defineField({ name: "name", type: "string", title: "Name", validation: (Rule) => Rule.required() }),
    defineField({ name: "bio", type: "text", rows: 3, title: "Bio" }),
    defineField({
      name: "avatar",
      type: "image",
      title: "Avatar",
      options: { hotspot: true },
    }),
  ],
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    languageField,
    statusField,
    defineField({ name: "question", type: "string", title: "Question", validation: (Rule) => Rule.required() }),
    defineField({ name: "answer", type: "text", rows: 5, title: "Answer", validation: (Rule) => Rule.required() }),
    defineField({ name: "group", type: "string", title: "Group" }),
    defineField({
      name: "service",
      type: "reference",
      to: [{ type: "service" }],
      title: "Related service",
    }),
  ],
  preview: {
    select: { title: "question", language: "language" },
    prepare: ({ title, language }) => ({ title, subtitle: language?.toUpperCase() }),
  },
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    languageField,
    statusField,
    defineField({ name: "quote", type: "text", rows: 4, title: "Quote", validation: (Rule) => Rule.required() }),
    defineField({ name: "person", type: "string", title: "Person" }),
    defineField({ name: "role", type: "string", title: "Role" }),
    defineField({ name: "imageUrl", type: "url", title: "Portrait URL" }),
    defineField({ name: "imageAlt", type: "string", title: "Portrait alt text" }),
    defineField({ name: "order", type: "number", title: "Display order" }),
    defineField({
      name: "client",
      type: "reference",
      to: [{ type: "client" }],
      title: "Client",
    }),
  ],
});

export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    defineField({ name: "from", type: "string", title: "From path", validation: (Rule) => Rule.required() }),
    defineField({ name: "to", type: "string", title: "To path", validation: (Rule) => Rule.required() }),
    defineField({
      name: "status",
      type: "number",
      title: "HTTP status",
      options: { list: [301, 302, 307, 308] },
      initialValue: 301,
    }),
  ],
  preview: {
    select: { from: "from", to: "to", status: "status" },
    prepare: ({ from, to, status }) => ({
      title: from,
      subtitle: `${status} → ${to}`,
    }),
  },
});
