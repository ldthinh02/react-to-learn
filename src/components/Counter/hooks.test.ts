/// <reference types="cypress"/>

import { renderHook, act } from "@testing-library/react-hooks/native";
import { useCounter } from "./hooks";

describe("", () => {
  it("should increment counter", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.counter).to.eq(1);
  });

  it("should decrement counter", () => {
    const { result } = renderHook(() => useCounter(2));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.counter).to.eq(1);
  });

  it("should prevent decrement below 0", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.decrement();
    });

    expect(result.current.counter).to.eq(0);
  });
});
