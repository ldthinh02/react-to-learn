import { useCounter } from "./hooks";
import Button from "@/components/Button";

const Counter = () => {
  const { counter, increment, decrement } = useCounter();

  return (
    <div className="flex items-center flex-col">
      <div className="flex items-center justify-center">
        <span
          data-cy="num"
          className="text-4xl mb-10 bg-red-300 p-3 rounded-full text-center"
        >
          {counter}
        </span>
      </div>
      <div className="mb-10 flex items-center">
        <Button onClick={increment}>Increment</Button>
        <span className="w-2" />
        <Button onClick={decrement}>Decrement</Button>
      </div>
    </div>
  );
};

export default Counter;
