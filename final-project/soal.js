/*Buatlah sebuah fungsi yang menerima minimal 
satu parameter angka dimana hasil dari fungsi 
tersebut adalah pasangan angka yang jika dijumlahkan 
akan sama dengan angka dari parameter. Pasangan 
angka tersebut didapatkan dari sebuah deret angka.";
*/

// Contoh1: arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// n = 8;
// result = [
//   [1, 7],
//   [2, 6],
//   [3, 5],
//   [4, 4],
//   [5, 3],
//   [6, 2],
//   [7, 1],
// ];

// Contoh2: arr = [0, 1, 2, 3, 4, 5, 6];
// n = 6;
// result = [
//   [0, 6],
//   [1, 5],
//   [2, 4],
//   [3, 3],
//   [4, 2],
//   [5, 1],
//   [6, 0],
// ];

// function findPairs(arr, targetSum) {
//   const result = [];

//   // Menggunakan set untuk menyimpan angka yang sudah diproses
//   const seen = new Set();

//   for (let num of arr) {
//     let complement = targetSum - num;

//     // Cek apakah complement sudah pernah ditemukan sebelumnya
//     if (seen.has(complement)) {
//       result.push([num, complement]);
//     }

//     // Tambahkan num ke dalam set seen
//     seen.add(num);
//   }

//   return result;
// }

function findPairs(arr, targetSum) {
  const result = [];

  // Looping pertama untuk mencari pasangan angka
  for (let i = 0; i < arr.length; i++) {
    let num1 = arr[i];

    // Looping kedua untuk mencocokkan dengan angka lainnya
    for (let j = i + 1; j < arr.length; j++) {
      let num2 = arr[j];

      // Jika jumlah dua angka sama dengan targetSum, tambahkan ke hasil
      if (num1 + num2 === targetSum) {
        result.push([num1, num2]);
      }
    }
  }

  return result;
}

// Test cases
console.log(findPairs([-100, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8));
// Output: [[1, 7], [2, 6], [3, 5], [4, 4]]

console.log(findPairs([0, 1, 2, 3, 4, 5, 6], 6));
// Output: [[0, 6], [1, 5], [2, 4], [3, 3]]
