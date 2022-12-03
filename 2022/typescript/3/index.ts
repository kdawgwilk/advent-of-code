
const priorityString = '-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function a(input: string): number {
  return input.split('\n').map(rucksackInput => {
    const rucksack = rucksackInput.split('')
    const half = Math.ceil(rucksack.length / 2)
    const firstCompartment = rucksack.slice(0, half)
    const secondCompartment = rucksack.slice(half)
    const sharedItem = firstCompartment.find(item => secondCompartment.includes(item))!
    const priority = priorityString.indexOf(sharedItem)
    return priority
  })
  .reduce((a, b) => a + b, 0)
}

export function b(input: string): number {
  return input.match(/(?:^.*$\n?){1,3}/mg)!
    .map(groupInput => {
      const [firstRucksackInput, secondRucksackInput, thirdRucksackInput] = groupInput.split('\n').slice(0, 3)
      const [firstRucksack, secondRucksack, thirdRucksack] = [firstRucksackInput, secondRucksackInput, thirdRucksackInput].map(rucksackInput => rucksackInput.split(''))
      // find the shared item
      const sharedItem = firstRucksack.find(item => secondRucksack.includes(item) && thirdRucksack.includes(item))!
      const priority = priorityString.indexOf(sharedItem)
      return priority
    })
    .reduce((a, b) => a + b, 0);
}
