import { cva, type VariantProps } from "class-variance-authority";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/60",
        rounded:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/60 rounded-3xl",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
        outline:
          "border border-input text-primary-foreground bg-transparent hover:bg-primary/15 active:bg-primary/40",
        outlineOnPrimary:
          "border border-input text-primary-foreground bg-transparent hover:bg-secondary/15 active:bg-secondary/40",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/60 focus:border-gray-500",
        ghost:
          "text-secondary hover:bg-secondary/15 hover:text-secondary/90 rounded-none",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "rounded-full border-transparent bg-primary text-secondary hover:bg-primary/90 active:bg-primary/60",
      },
      size: {
        default: "px-3 py-2",
        xs: "p-1 rounded-1xl",
        sm: "px-2 py-1.5 rounded-2xl",
        lg: "px-6 py-4 rounded-3xl",
        jumbo: "px-8 py-5 rounded-3xl text-2xl sm:text-5xl xl:text-7xl",
        icon: "size-10",
      },
      rounded: {
        default: "rounded-3xl",
        xs: "p-1 rounded-1xl",
        sm: "px-2 py-1.5 rounded-2xl",
        lg: "px-6 py-4 rounded-3xl",
        jumbo: "px-8 py-5 rounded-3xl text-2xl sm:text-5xl xl:text-7xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
