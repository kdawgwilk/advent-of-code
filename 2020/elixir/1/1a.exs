defmodule AdventOfCode2020.Day1A do

  @sum_amount 2020

  def call(input_file) do
    input_path = Path.dirname(__ENV__.file) <> "/" <> input_file
    {:ok, contents} = File.read(input_path)

    contents
    |> String.split("\n", trim: true)
    |> Enum.map(&String.to_integer/1)
    |> solve()
  end

  defp solve(entries, entry \\ nil)

  defp solve([], _) do
    IO.puts "No Solution Found"
  end

  defp solve([entry | rest], nil), do: solve(rest, entry)

  defp solve(entries, entry1) do
    entries
    |> Enum.find(&matches_sum?(&1, entry1))
    |> case do
      nil ->
        [next_entry | rest] = entries
        solve(rest, next_entry)
      entry2 ->
        entry1 * entry2
    end
  end

  defp matches_sum?(entry1, entry2), do: entry1 + entry2 == @sum_amount
end

"input.txt"
|> AdventOfCode2020.Day1A.call()
|> IO.inspect(label: "Answer")
