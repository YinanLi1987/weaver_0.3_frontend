export const primaryButton =
  "px-3 py-1.5 text-sm rounded-md bg-neutral-800 text-white hover:bg-neutral-900 transition";

export const toggleButton = (selected: boolean) =>
  `px-3 py-1 text-sm border rounded-md ${
    selected
      ? "bg-neutral-800 text-white"
      : "bg-white hover:bg-gray-50 border-gray-300"
  }`;
