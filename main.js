'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let startPoint = []
let endPoint = []

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// func thats printing the current board to the terminal
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Func that moves the stones from one stack to another
const movePiece = (start, end) => {
  let ring = stacks[start].pop();
  stacks[end].push(ring);
}

// Func that is check for valid moves. Cannot stack large on small. checks for invalid input also
const isLegal = (start, end) => {
  if(start === 'a' || start === 'b' || start === 'c'){
    if(end === 'a' || end === 'b' || end === 'c'){
      if(stacks[start].slice(-1) < stacks[end].slice(-1) || stacks[end].slice(-1)==0) {
        return true;
      } else {
        console.log("Invalid Move. Please try again");
        return false;
      }
    } else {
      console.log('Invalid Input')
      return false;
    }
  } else {
    console.log('Invalid Input')
  }
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  if(stacks['c'].length === 4){
    if(stacks['c'][0] === 4 && stacks['c'][1] === 3 && stacks['c'][3] === 1){
      console.log('Winner!!!!!!!!!!!!')
      return true;
    }
  }
  else {
    return false;
  }
}

// Func thats checking for legal move, then calling func to move stone, and then checking for win
const towersOfHanoi = (startStack, endStack) => {
  if (isLegal(startStack, endStack)){
    movePiece(startStack, endStack)
    checkForWin()
  } 
  

}
//Gets input from user and starts the game
const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Tests //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
