let listOfLinks = [];

// links look like https://adventofcode.com/2022/day/1
// and https://adventofcode.com/2022/day/1#part2

for (let day = 1; day <= 25; day++) {
  let tempArrPart1 = {
    title: `Day ${day} Puzzle 1`,
    link: `https://adventofcode.com/2022/day/${day}`,
  };
  let tempArrPart2 = {
    title: `Day ${day} Puzzle 2`,
    link: `https://adventofcode.com/2022/day/${day}#part2`,
  };
  listOfLinks.push(tempArrPart1);
  listOfLinks.push(tempArrPart2);
}

export default listOfLinks;
