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

  defp solve(entries, entry1 \\ nil, entry2 \\ nil)

  defp solve([], _, _) do
    IO.puts "No Solution Found"
  end

  defp solve([entry1, entry2 | rest], nil, nil), do: solve(rest, entry1, entry2)

  defp solve(entries, entry1, entry2) do
    entries
    |> Enum.find(&matches_sum?(&1, entry1, entry2))
    |> case do
      nil ->
        [next_entry | rest] = entries
        solve(rest, entry1, next_entry)
      entry3 ->
        entry1 * entry2 * entry3
    end
  end

  defp matches_sum?(entry1, entry2, entry3), do: entry1 + entry2 + entry3 == @sum_amount
end

"input.txt"
|> AdventOfCode2020.Day1A.call()
|> IO.inspect(label: "Answer")
