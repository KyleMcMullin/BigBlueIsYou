MyGame.systems.FileParsing = function() {
  let filesToLoad = [
    "bonus.bbiy",
    "level-1.bbiy",
    "level-2.bbiy",
    "level-3.bbiy",
    "level-4.bbiy",
    "level-5.bbiy",
  ];

  let levelsData = [];

  async function bigFile() {
    const response = await fetch("./levels/levels-all.bbiy");
    const data = await response.text();
    const lines = data.split("\n");
    const arraySize = Math.floor(lines.length / 42);

    let dataArray = [];

    for (let i = 0; i < arraySize; i++){
      const startIndex = i * 42;
      const endIndex = startIndex + 42;
      const chunk = lines.slice(startIndex, endIndex).join("\n");
      dataArray.push(chunk);
      readFile(dataArray[i]);
    }

    return levelsData;
  }

  async function readFiles(){
    for (let i = 0; i < filesToLoad.length; i++){
        const response = await fetch("./levels/" + filesToLoad[i]);
        const data = await response.text();
        readFile(data);
      }

    return levelsData;
  };

  function readFile(data){
    let lines = data.split("\n").map(line => line.replace(/\r$/, ""));
    let levelNum = lines[0];
    let bigBlueLocation;
    levelNum = levelNum.slice(6, levelNum.length);
    if(typeof levelNum !== "number"){
      levelNum = 0;
    }
    const sizeLine = lines[1];
    const sizeArray = sizeLine.split(" ");
    const size = {rows: parseInt(sizeArray[0]), cols: parseInt(sizeArray[2])};

    let objects = [];
    for(let j = 0; j < size.rows; j++){
      objects.push([]);
        for(let k = 0; k < size.cols; k++){
          objects[j].push(buildObject(lines[j + 2][k], j, k));
          if (lines[j + 22][k] !== " "){
            objects[j][k] = buildObject(lines[j + 22][k], j, k);
          }

          if (objects[j][k] !== null && objects[j][k].type === "bigBlue"){
            bigBlueLocation = {x: j, y: k};
          }
        }
    }
    
    let level = {
        levelNum,
        size,
        objects,
        bigBlueLocation
    }
    
    levelsData.push(level);
  }

  return {
    readFiles: readFiles,
    bigFile: bigFile
  };
}

function buildObject(letter, x, y) {
  switch (letter) {
    case 'h':
      return { type: 'hedge', x: x, y: y};
    case 'w':
      return { type: 'wall', x: x, y: y };
    case 'f':
      return { type: 'flag', x: x, y: y };
    case 'b':
      return { type: 'bigBlue', x: x, y: y };
    case 'l':
      return { type: 'floor', x: x, y: y };
    case 'g':
      return { type: 'grass', x: x, y: y };
    case 'a':
      return { type: 'water', x: x, y: y };
    case 'v':
      return { type: 'lava', x: x, y: y};
    case 'r':
      return { type: 'rock', x: x, y: y};
    
    case 'W':
      return {type: "word-wall", x: x, y: y};
    case 'R':
      return {type: "word-rock", x: x, y: y};
    case 'F':
      return {type: "word-flag", x: x, y: y};
    case 'B':
      return {type: "word-baba", x: x, y: y};
    case 'I':
      return {type: "word-is", x: x, y: y};
    case 'S':
      return {type: "word-stop", x: x, y: y};
    case 'P':
      return {type: "word-push", x: x, y: y};
    case 'V':
      return {type: "word-lava", x: x, y: y};
    case 'A':
      return {type: "word-water", x: x, y: y};
    case 'Y':
      return {type: "word-you", x: x, y: y};
    case 'X':
      return {type: "word-win", x: x, y: y};
    case "N":
      return {type: "word-sink", x: x, y: y};
    case "K":
      return {type: "word-kill", x: x, y: y};
    default:
      return null; // or throw an error for invalid letters
  }
}
