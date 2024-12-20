import { Button } from "@nextui-org/react";

export const DateNavbar = ({
  handlePreviousMonth,
  handleNextMonth,
  month,
  year,
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
      <Button
        variant="bordered"
        onPress={() => {
          handlePreviousMonth();
        }}
        isIconOnly
        className="rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-4 rotate-180"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </Button>
      <p className="font-semibold text-lg text-center min-w-[150px]">
        {month} {year}
      </p>
      <Button
        variant="bordered"
        onPress={() => {
          handleNextMonth();
        }}
        isIconOnly
        className="rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </Button>
    </div>
  );
};
