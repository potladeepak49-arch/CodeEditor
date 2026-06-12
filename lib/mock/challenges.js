export const mockChallenges = [
  // ─── EASY ───────────────────────────────────────────────────────
  {
    id: 'ch_01', slug: 'two-sum', title: 'Two Sum',
    difficulty: 'easy', tags: ['array', 'hash-map'], acceptanceRate: 49,
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {\n  \n};`,
      python: `def twoSum(nums, target):\n    pass`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};`,
    },
  },
  {
    id: 'ch_02', slug: 'valid-parentheses', title: 'Valid Parentheses',
    difficulty: 'easy', tags: ['stack', 'string'], acceptanceRate: 40,
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets in the correct order.',
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    starterCode: {
      javascript: `function isValid(s) {\n  \n};`,
      python: `def isValid(s):\n    pass`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_03', slug: 'palindrome-number', title: 'Palindrome Number',
    difficulty: 'easy', tags: ['math'], acceptanceRate: 52,
    description: 'Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise. An integer is a palindrome when it reads the same forward and backward.',
    examples: [
      { input: 'x = 121', output: 'true', explanation: '121 reads as 121 from left to right and from right to left.' },
      { input: 'x = -121', output: 'false', explanation: 'From left to right, it reads -121. From right to left, it becomes 121-.' },
      { input: 'x = 10', output: 'false' },
    ],
    starterCode: {
      javascript: `function isPalindrome(x) {\n  \n};`,
      python: `def isPalindrome(x):\n    pass`,
      java: `class Solution {\n    public boolean isPalindrome(int x) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_04', slug: 'reverse-string', title: 'Reverse String',
    difficulty: 'easy', tags: ['string', 'two-pointers'], acceptanceRate: 75,
    description: 'Write a function that reverses a string. The input string is given as an array of characters `s`. You must do this by modifying the input array in-place with O(1) extra memory.',
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
    ],
    starterCode: {
      javascript: `function reverseString(s) {\n  \n};`,
      python: `def reverseString(s):\n    pass`,
      java: `class Solution {\n    public void reverseString(char[] s) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_05', slug: 'fizzbuzz', title: 'FizzBuzz',
    difficulty: 'easy', tags: ['math', 'string', 'simulation'], acceptanceRate: 67,
    description: 'Given an integer `n`, return a string array where: `answer[i] == "FizzBuzz"` if `i` is divisible by 3 and 5, `answer[i] == "Fizz"` if `i` is divisible by 3, `answer[i] == "Buzz"` if `i` is divisible by 5, `answer[i] == i` (as a string) if none of the above conditions are true.',
    examples: [
      { input: 'n = 3', output: '["1","2","Fizz"]' },
      { input: 'n = 5', output: '["1","2","Fizz","4","Buzz"]' },
      { input: 'n = 15', output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' },
    ],
    starterCode: {
      javascript: `function fizzBuzz(n) {\n  \n};`,
      python: `def fizzBuzz(n):\n    pass`,
      java: `class Solution {\n    public List<String> fizzBuzz(int n) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_06', slug: 'maximum-depth-binary-tree', title: 'Maximum Depth of Binary Tree',
    difficulty: 'easy', tags: ['tree', 'dfs', 'bfs', 'recursion'], acceptanceRate: 73,
    description: 'Given the `root` of a binary tree, return its maximum depth. A binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3' },
      { input: 'root = [1,null,2]', output: '2' },
    ],
    starterCode: {
      javascript: `function maxDepth(root) {\n  \n};`,
      python: `def maxDepth(root):\n    pass`,
      java: `class Solution {\n    public int maxDepth(TreeNode root) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_07', slug: 'single-number', title: 'Single Number',
    difficulty: 'easy', tags: ['array', 'bit-manipulation'], acceptanceRate: 70,
    description: 'Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.',
    examples: [
      { input: 'nums = [2,2,1]', output: '1' },
      { input: 'nums = [4,1,2,1,2]', output: '4' },
      { input: 'nums = [1]', output: '1' },
    ],
    starterCode: {
      javascript: `function singleNumber(nums) {\n  \n};`,
      python: `def singleNumber(nums):\n    pass`,
      java: `class Solution {\n    public int singleNumber(int[] nums) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_08', slug: 'missing-number', title: 'Missing Number',
    difficulty: 'easy', tags: ['array', 'math', 'bit-manipulation'], acceptanceRate: 62,
    description: 'Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.',
    examples: [
      { input: 'nums = [3,0,1]', output: '2' },
      { input: 'nums = [0,1]', output: '2' },
      { input: 'nums = [9,6,4,2,3,5,7,0,1]', output: '8' },
    ],
    starterCode: {
      javascript: `function missingNumber(nums) {\n  \n};`,
      python: `def missingNumber(nums):\n    pass`,
      java: `class Solution {\n    public int missingNumber(int[] nums) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_09', slug: 'climbing-stairs', title: 'Climbing Stairs',
    difficulty: 'easy', tags: ['dp', 'math', 'memoization'], acceptanceRate: 51,
    description: 'You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      { input: 'n = 2', output: '2', explanation: '1 step + 1 step, or 2 steps.' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, or 2+1.' },
    ],
    starterCode: {
      javascript: `function climbStairs(n) {\n  \n};`,
      python: `def climbStairs(n):\n    pass`,
      java: `class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_10', slug: 'best-time-to-buy-stock', title: 'Best Time to Buy and Sell Stock',
    difficulty: 'easy', tags: ['array', 'dp'], acceptanceRate: 54,
    description: 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day. You want to maximize your profit by choosing a single day to buy and a single day to sell. Return the maximum profit. If no profit is possible, return 0.',
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price=1) and sell on day 5 (price=6), profit = 6-1 = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'No profit is possible.' },
    ],
    starterCode: {
      javascript: `function maxProfit(prices) {\n  \n};`,
      python: `def maxProfit(prices):\n    pass`,
      java: `class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_11', slug: 'contains-duplicate', title: 'Contains Duplicate',
    difficulty: 'easy', tags: ['array', 'hash-map', 'sorting'], acceptanceRate: 61,
    description: 'Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.',
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true' },
      { input: 'nums = [1,2,3,4]', output: 'false' },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', output: 'true' },
    ],
    starterCode: {
      javascript: `function containsDuplicate(nums) {\n  \n};`,
      python: `def containsDuplicate(nums):\n    pass`,
      java: `class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_12', slug: 'roman-to-integer', title: 'Roman to Integer',
    difficulty: 'easy', tags: ['hash-map', 'math', 'string'], acceptanceRate: 58,
    description: 'Given a roman numeral, convert it to an integer. Roman numerals are represented by seven different symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000.',
    examples: [
      { input: 's = "III"', output: '3' },
      { input: 's = "LVIII"', output: '58', explanation: 'L=50, V=5, III=3.' },
      { input: 's = "MCMXCIV"', output: '1994' },
    ],
    starterCode: {
      javascript: `function romanToInt(s) {\n  \n};`,
      python: `def romanToInt(s):\n    pass`,
      java: `class Solution {\n    public int romanToInt(String s) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_13', slug: 'majority-element', title: 'Majority Element',
    difficulty: 'easy', tags: ['array', 'hash-map', 'sorting'], acceptanceRate: 63,
    description: 'Given an array `nums` of size `n`, return the majority element. The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.',
    examples: [
      { input: 'nums = [3,2,3]', output: '3' },
      { input: 'nums = [2,2,1,1,1,2,2]', output: '2' },
    ],
    starterCode: {
      javascript: `function majorityElement(nums) {\n  \n};`,
      python: `def majorityElement(nums):\n    pass`,
      java: `class Solution {\n    public int majorityElement(int[] nums) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_14', slug: 'move-zeroes', title: 'Move Zeroes',
    difficulty: 'easy', tags: ['array', 'two-pointers'], acceptanceRate: 60,
    description: 'Given an integer array `nums`, move all 0\'s to the end of it while maintaining the relative order of the non-zero elements. Note that you must do this in-place without making a copy of the array.',
    examples: [
      { input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]' },
      { input: 'nums = [0]', output: '[0]' },
    ],
    starterCode: {
      javascript: `function moveZeroes(nums) {\n  \n};`,
      python: `def moveZeroes(nums):\n    pass`,
      java: `class Solution {\n    public void moveZeroes(int[] nums) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_15', slug: 'reverse-linked-list', title: 'Reverse Linked List',
    difficulty: 'easy', tags: ['linked-list', 'recursion'], acceptanceRate: 73,
    description: 'Given the `head` of a singly linked list, reverse the list, and return the reversed list.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' },
      { input: 'head = []', output: '[]' },
    ],
    starterCode: {
      javascript: `function reverseList(head) {\n  \n};`,
      python: `def reverseList(head):\n    pass`,
      java: `class Solution {\n    public ListNode reverseList(ListNode head) {\n        \n    }\n}`,
    },
  },

  // ─── MEDIUM ─────────────────────────────────────────────────────
  {
    id: 'ch_16', slug: 'longest-substring', title: 'Longest Substring Without Repeating Characters',
    difficulty: 'medium', tags: ['sliding-window', 'string', 'hash-map'], acceptanceRate: 34,
    description: 'Given a string `s`, find the length of the longest substring without repeating characters.',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with length 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b".' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke".' },
    ],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {\n  \n};`,
      python: `def lengthOfLongestSubstring(s):\n    pass`,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_17', slug: 'merge-intervals', title: 'Merge Intervals',
    difficulty: 'medium', tags: ['array', 'sorting'], acceptanceRate: 46,
    description: 'Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]' },
    ],
    starterCode: {
      javascript: `function merge(intervals) {\n  \n};`,
      python: `def merge(intervals):\n    pass`,
      java: `class Solution {\n    public int[][] merge(int[][] intervals) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_18', slug: 'group-anagrams', title: 'Group Anagrams',
    difficulty: 'medium', tags: ['array', 'hash-map', 'string', 'sorting'], acceptanceRate: 67,
    description: 'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.',
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' },
    ],
    starterCode: {
      javascript: `function groupAnagrams(strs) {\n  \n};`,
      python: `def groupAnagrams(strs):\n    pass`,
      java: `class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_19', slug: 'top-k-frequent', title: 'Top K Frequent Elements',
    difficulty: 'medium', tags: ['array', 'hash-map', 'heap', 'bucket-sort'], acceptanceRate: 65,
    description: 'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.',
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
      { input: 'nums = [1], k = 1', output: '[1]' },
    ],
    starterCode: {
      javascript: `function topKFrequent(nums, k) {\n  \n};`,
      python: `def topKFrequent(nums, k):\n    pass`,
      java: `class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_20', slug: 'product-except-self', title: 'Product of Array Except Self',
    difficulty: 'medium', tags: ['array', 'prefix-sum'], acceptanceRate: 65,
    description: 'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.',
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' },
    ],
    starterCode: {
      javascript: `function productExceptSelf(nums) {\n  \n};`,
      python: `def productExceptSelf(nums):\n    pass`,
      java: `class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_21', slug: 'valid-sudoku', title: 'Valid Sudoku',
    difficulty: 'medium', tags: ['array', 'hash-map', 'matrix'], acceptanceRate: 58,
    description: 'Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the rules: each row, column, and 3x3 box must contain the digits 1-9 without repetition.',
    examples: [
      { input: 'board = (see problem)', output: 'true' },
    ],
    starterCode: {
      javascript: `function isValidSudoku(board) {\n  \n};`,
      python: `def isValidSudoku(board):\n    pass`,
      java: `class Solution {\n    public boolean isValidSudoku(char[][] board) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_22', slug: 'encode-decode-strings', title: 'Encode and Decode Strings',
    difficulty: 'medium', tags: ['string', 'design'], acceptanceRate: 39,
    description: 'Design an algorithm to encode a list of strings to a single string. The encoded string is then sent over the network and is decoded back to the original list of strings.',
    examples: [
      { input: '["lint","code","love","you"]', output: '["lint","code","love","you"]', explanation: 'Original list is returned after encode then decode.' },
    ],
    starterCode: {
      javascript: `function encode(strs) {\n  \n};\n\nfunction decode(s) {\n  \n};`,
      python: `def encode(strs):\n    pass\n\ndef decode(s):\n    pass`,
    },
  },
  {
    id: 'ch_23', slug: 'longest-consecutive-sequence', title: 'Longest Consecutive Sequence',
    difficulty: 'medium', tags: ['array', 'hash-map', 'union-find'], acceptanceRate: 46,
    description: 'Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.',
    examples: [
      { input: 'nums = [100,4,200,1,3,2]', output: '4', explanation: '[1,2,3,4] is the longest consecutive sequence.' },
      { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9' },
    ],
    starterCode: {
      javascript: `function longestConsecutive(nums) {\n  \n};`,
      python: `def longestConsecutive(nums):\n    pass`,
      java: `class Solution {\n    public int longestConsecutive(int[] nums) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_24', slug: 'three-sum', title: '3Sum',
    difficulty: 'medium', tags: ['array', 'two-pointers', 'sorting'], acceptanceRate: 33,
    description: 'Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. The solution set must not contain duplicate triplets.',
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,1,1]', output: '[]' },
      { input: 'nums = [0,0,0]', output: '[[0,0,0]]' },
    ],
    starterCode: {
      javascript: `function threeSum(nums) {\n  \n};`,
      python: `def threeSum(nums):\n    pass`,
      java: `class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_25', slug: 'container-with-most-water', title: 'Container With Most Water',
    difficulty: 'medium', tags: ['array', 'two-pointers', 'greedy'], acceptanceRate: 54,
    description: 'You are given an integer array `height` of length `n`. There are `n` vertical lines. Find two lines that together with the x-axis form a container that contains the most water.',
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49' },
      { input: 'height = [1,1]', output: '1' },
    ],
    starterCode: {
      javascript: `function maxArea(height) {\n  \n};`,
      python: `def maxArea(height):\n    pass`,
      java: `class Solution {\n    public int maxArea(int[] height) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_26', slug: 'binary-search', title: 'Binary Search',
    difficulty: 'easy', tags: ['array', 'binary-search'], acceptanceRate: 55,
    description: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, return its index. Otherwise, return -1.',
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' },
    ],
    starterCode: {
      javascript: `function search(nums, target) {\n  \n};`,
      python: `def search(nums, target):\n    pass`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_27', slug: 'search-in-rotated-array', title: 'Search in Rotated Sorted Array',
    difficulty: 'medium', tags: ['array', 'binary-search'], acceptanceRate: 39,
    description: 'There is an integer array `nums` sorted in ascending order (with distinct values). The array may have been rotated. Given the array `nums` and an integer `target`, return the index of `target` if it is in `nums`, or -1 if it is not.',
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' },
    ],
    starterCode: {
      javascript: `function search(nums, target) {\n  \n};`,
      python: `def search(nums, target):\n    pass`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_28', slug: 'koko-eating-bananas', title: 'Koko Eating Bananas',
    difficulty: 'medium', tags: ['array', 'binary-search'], acceptanceRate: 47,
    description: 'Koko loves to eat bananas. There are `n` piles of bananas. Koko can decide her bananas-per-hour eating speed of `k`. Return the minimum integer `k` such that she can eat all the bananas within `h` hours.',
    examples: [
      { input: 'piles = [3,6,7,11], h = 8', output: '4' },
      { input: 'piles = [30,11,23,4,20], h = 5', output: '30' },
    ],
    starterCode: {
      javascript: `function minEatingSpeed(piles, h) {\n  \n};`,
      python: `def minEatingSpeed(piles, h):\n    pass`,
      java: `class Solution {\n    public int minEatingSpeed(int[] piles, int h) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_29', slug: 'linked-list-cycle', title: 'Linked List Cycle',
    difficulty: 'easy', tags: ['linked-list', 'two-pointers', 'hash-map'], acceptanceRate: 46,
    description: 'Given `head`, the head of a linked list, determine if the linked list has a cycle in it. Return `true` if there is a cycle in the linked list, otherwise `false`.',
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: 'true' },
      { input: 'head = [1,2], pos = 0', output: 'true' },
      { input: 'head = [1], pos = -1', output: 'false' },
    ],
    starterCode: {
      javascript: `function hasCycle(head) {\n  \n};`,
      python: `def hasCycle(head):\n    pass`,
      java: `class Solution {\n    public boolean hasCycle(ListNode head) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_30', slug: 'lru-cache', title: 'LRU Cache',
    difficulty: 'medium', tags: ['hash-map', 'linked-list', 'design'], acceptanceRate: 41,
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the `LRUCache` class with `get` and `put` methods, both running in O(1) time complexity.',
    examples: [
      { input: 'LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2), put(4,4), get(1), get(3), get(4)', output: '[1,-1,-1,3,4]' },
    ],
    starterCode: {
      javascript: `class LRUCache {\n  constructor(capacity) {\n    \n  }\n  get(key) {\n    \n  }\n  put(key, value) {\n    \n  }\n}`,
      python: `class LRUCache:\n    def __init__(self, capacity):\n        pass\n    def get(self, key):\n        pass\n    def put(self, key, value):\n        pass`,
    },
  },

  // ─── MORE MEDIUM ────────────────────────────────────────────────
  {
    id: 'ch_31', slug: 'number-of-islands', title: 'Number of Islands',
    difficulty: 'medium', tags: ['array', 'dfs', 'bfs', 'matrix', 'union-find'], acceptanceRate: 57,
    description: 'Given an m x n 2D binary grid `grid` which represents a map of `1`s (land) and `0`s (water), return the number of islands.',
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3' },
    ],
    starterCode: {
      javascript: `function numIslands(grid) {\n  \n};`,
      python: `def numIslands(grid):\n    pass`,
      java: `class Solution {\n    public int numIslands(char[][] grid) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_32', slug: 'clone-graph', title: 'Clone Graph',
    difficulty: 'medium', tags: ['graph', 'dfs', 'bfs', 'hash-map'], acceptanceRate: 54,
    description: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.',
    examples: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]' },
    ],
    starterCode: {
      javascript: `function cloneGraph(node) {\n  \n};`,
      python: `def cloneGraph(node):\n    pass`,
    },
  },
  {
    id: 'ch_33', slug: 'pacific-atlantic-water-flow', title: 'Pacific Atlantic Water Flow',
    difficulty: 'medium', tags: ['array', 'dfs', 'bfs', 'matrix'], acceptanceRate: 52,
    description: 'There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. Water can flow to neighboring cells (up, down, left, right) if the neighboring cell\'s height is less than or equal to the current cell\'s height. Return a list of grid coordinates where water can flow to both the Pacific and Atlantic ocean.',
    examples: [
      { input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]', output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]' },
    ],
    starterCode: {
      javascript: `function pacificAtlantic(heights) {\n  \n};`,
      python: `def pacificAtlantic(heights):\n    pass`,
    },
  },
  {
    id: 'ch_34', slug: 'course-schedule', title: 'Course Schedule',
    difficulty: 'medium', tags: ['graph', 'dfs', 'bfs', 'topological-sort'], acceptanceRate: 45,
    description: 'There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites`. Return `true` if you can finish all courses, otherwise `false`.',
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: 'There is a cycle.' },
    ],
    starterCode: {
      javascript: `function canFinish(numCourses, prerequisites) {\n  \n};`,
      python: `def canFinish(numCourses, prerequisites):\n    pass`,
    },
  },
  {
    id: 'ch_35', slug: 'implement-trie', title: 'Implement Trie (Prefix Tree)',
    difficulty: 'medium', tags: ['trie', 'design', 'string'], acceptanceRate: 63,
    description: 'A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the `Trie` class with `insert`, `search`, and `startsWith` methods.',
    examples: [
      { input: 'insert("apple"), search("apple"), search("app"), startsWith("app"), insert("app"), search("app")', output: '[true,false,true,true]' },
    ],
    starterCode: {
      javascript: `class Trie {\n  constructor() {\n    \n  }\n  insert(word) {\n    \n  }\n  search(word) {\n    \n  }\n  startsWith(prefix) {\n    \n  }\n}`,
      python: `class Trie:\n    def __init__(self):\n        pass\n    def insert(self, word):\n        pass\n    def search(self, word):\n        pass\n    def startsWith(self, prefix):\n        pass`,
    },
  },
  {
    id: 'ch_36', slug: 'coin-change', title: 'Coin Change',
    difficulty: 'medium', tags: ['array', 'dp', 'bfs'], acceptanceRate: 42,
    description: 'You are given an integer array `coins` representing coins of different denominations and an integer `amount`. Return the fewest number of coins that you need to make up that amount. If that amount cannot be made up, return -1.',
    examples: [
      { input: 'coins = [1,5,11], amount = 11', output: '1' },
      { input: 'coins = [2], amount = 3', output: '-1' },
    ],
    starterCode: {
      javascript: `function coinChange(coins, amount) {\n  \n};`,
      python: `def coinChange(coins, amount):\n    pass`,
      java: `class Solution {\n    public int coinChange(int[] coins, int amount) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_37', slug: 'longest-increasing-subsequence', title: 'Longest Increasing Subsequence',
    difficulty: 'medium', tags: ['array', 'dp', 'binary-search'], acceptanceRate: 54,
    description: 'Given an integer array `nums`, return the length of the longest strictly increasing subsequence.',
    examples: [
      { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: '[2,3,7,101].' },
      { input: 'nums = [0,1,0,3,2,3]', output: '4' },
    ],
    starterCode: {
      javascript: `function lengthOfLIS(nums) {\n  \n};`,
      python: `def lengthOfLIS(nums):\n    pass`,
      java: `class Solution {\n    public int lengthOfLIS(int[] nums) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_38', slug: 'unique-paths', title: 'Unique Paths',
    difficulty: 'medium', tags: ['math', 'dp', 'combinatorics'], acceptanceRate: 63,
    description: 'There is a robot on an `m x n` grid. The robot is initially located at the top-left corner. The robot tries to move to the bottom-right corner. The robot can only move either down or right. Given `m` and `n`, return the number of possible unique paths.',
    examples: [
      { input: 'm = 3, n = 7', output: '28' },
      { input: 'm = 3, n = 2', output: '3' },
    ],
    starterCode: {
      javascript: `function uniquePaths(m, n) {\n  \n};`,
      python: `def uniquePaths(m, n):\n    pass`,
      java: `class Solution {\n    public int uniquePaths(int m, int n) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_39', slug: 'jump-game', title: 'Jump Game',
    difficulty: 'medium', tags: ['array', 'greedy', 'dp'], acceptanceRate: 38,
    description: 'You are given an integer array `nums`. You are initially positioned at the first index. Each element represents your maximum jump length. Return `true` if you can reach the last index, or `false` otherwise.',
    examples: [
      { input: 'nums = [2,3,1,1,4]', output: 'true' },
      { input: 'nums = [3,2,1,0,4]', output: 'false' },
    ],
    starterCode: {
      javascript: `function canJump(nums) {\n  \n};`,
      python: `def canJump(nums):\n    pass`,
      java: `class Solution {\n    public boolean canJump(int[] nums) {\n        \n    }\n}`,
    },
  },
  {
    id: 'ch_40', slug: 'rotate-image', title: 'Rotate Image',
    difficulty: 'medium', tags: ['array', 'math', 'matrix'], acceptanceRate: 73,
    description: 'You are given an n x n 2D matrix representing an image. Rotate the image by 90 degrees (clockwise). You have to rotate the image in-place.',
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]' },
    ],
    starterCode: {
      javascript: `function rotate(matrix) {\n  \n};`,
      python: `def rotate(matrix):\n    pass`,
      java: `class Solution {\n    public void rotate(int[][] matrix) {\n        \n    }\n}`,
    },
  },

  // ─── HARD ───────────────────────────────────────────────────────
  {
    id: 'ch_41', slug: 'word-search', title: 'Word Search',
    difficulty: 'hard', tags: ['backtracking', 'dfs', 'matrix'], acceptanceRate: 40,
    description: 'Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid. The word can be constructed from letters of sequentially adjacent cells.',
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"', output: 'true' },
    ],
    starterCode: { javascript: `function exist(board, word) {\n  \n};`, python: `def exist(board, word):\n    pass` },
  },
  {
    id: 'ch_42', slug: 'median-two-sorted-arrays', title: 'Median of Two Sorted Arrays',
    difficulty: 'hard', tags: ['array', 'binary-search', 'divide-and-conquer'], acceptanceRate: 37,
    description: 'Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).',
    examples: [
      { input: 'nums1 = [1,3], nums2 = [2]', output: '2.00000' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.50000' },
    ],
    starterCode: { javascript: `function findMedianSortedArrays(nums1, nums2) {\n  \n};`, python: `def findMedianSortedArrays(nums1, nums2):\n    pass` },
  },
  {
    id: 'ch_43', slug: 'trapping-rain-water', title: 'Trapping Rain Water',
    difficulty: 'hard', tags: ['array', 'two-pointers', 'dp', 'stack'], acceptanceRate: 60,
    description: 'Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
      { input: 'height = [4,2,0,3,2,5]', output: '9' },
    ],
    starterCode: { javascript: `function trap(height) {\n  \n};`, python: `def trap(height):\n    pass` },
  },
  {
    id: 'ch_44', slug: 'n-queens', title: 'N-Queens',
    difficulty: 'hard', tags: ['backtracking', 'array'], acceptanceRate: 65,
    description: 'The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other. Given an integer `n`, return all distinct solutions to the n-queens puzzle.',
    examples: [
      { input: 'n = 4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
      { input: 'n = 1', output: '[["Q"]]' },
    ],
    starterCode: { javascript: `function solveNQueens(n) {\n  \n};`, python: `def solveNQueens(n):\n    pass` },
  },
  {
    id: 'ch_45', slug: 'serialize-deserialize-binary-tree', title: 'Serialize and Deserialize Binary Tree',
    difficulty: 'hard', tags: ['tree', 'dfs', 'bfs', 'design', 'string'], acceptanceRate: 55,
    description: 'Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work.',
    examples: [
      { input: 'root = [1,2,3,null,null,4,5]', output: '[1,2,3,null,null,4,5]' },
    ],
    starterCode: {
      javascript: `function serialize(root) {\n  \n};\n\nfunction deserialize(data) {\n  \n};`,
      python: `def serialize(root):\n    pass\n\ndef deserialize(data):\n    pass`,
    },
  },
  {
    id: 'ch_46', slug: 'merge-k-sorted-lists', title: 'Merge K Sorted Lists',
    difficulty: 'hard', tags: ['linked-list', 'divide-and-conquer', 'heap', 'merge-sort'], acceptanceRate: 51,
    description: 'You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', output: '[]' },
    ],
    starterCode: { javascript: `function mergeKLists(lists) {\n  \n};`, python: `def mergeKLists(lists):\n    pass` },
  },
  {
    id: 'ch_47', slug: 'largest-rectangle-histogram', title: 'Largest Rectangle in Histogram',
    difficulty: 'hard', tags: ['array', 'stack', 'monotonic-stack'], acceptanceRate: 43,
    description: 'Given an array of integers `heights` representing the histogram\'s bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.',
    examples: [
      { input: 'heights = [2,1,5,6,2,3]', output: '10' },
      { input: 'heights = [2,4]', output: '4' },
    ],
    starterCode: { javascript: `function largestRectangleArea(heights) {\n  \n};`, python: `def largestRectangleArea(heights):\n    pass` },
  },
  {
    id: 'ch_48', slug: 'minimum-window-substring', title: 'Minimum Window Substring',
    difficulty: 'hard', tags: ['hash-map', 'string', 'sliding-window'], acceptanceRate: 41,
    description: 'Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window.',
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
      { input: 's = "a", t = "a"', output: '"a"' },
      { input: 's = "a", t = "aa"', output: '""' },
    ],
    starterCode: { javascript: `function minWindow(s, t) {\n  \n};`, python: `def minWindow(s, t):\n    pass` },
  },
  {
    id: 'ch_49', slug: 'alien-dictionary', title: 'Alien Dictionary',
    difficulty: 'hard', tags: ['graph', 'topological-sort', 'string', 'bfs', 'dfs'], acceptanceRate: 34,
    description: 'There is a new alien language that uses the English alphabet. You are given a list of strings `words` from the alien language\'s dictionary, where the strings in `words` are sorted lexicographically by the rules of this new language. Derive the order of letters in this alien language.',
    examples: [
      { input: 'words = ["wrt","wrf","er","ett","rftt"]', output: '"wertf"' },
      { input: 'words = ["z","x"]', output: '"zx"' },
    ],
    starterCode: { javascript: `function alienOrder(words) {\n  \n};`, python: `def alienOrder(words):\n    pass` },
  },
  {
    id: 'ch_50', slug: 'sliding-window-maximum', title: 'Sliding Window Maximum',
    difficulty: 'hard', tags: ['array', 'queue', 'sliding-window', 'monotonic-queue'], acceptanceRate: 46,
    description: 'You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. Return the max sliding window.',
    examples: [
      { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' },
      { input: 'nums = [1], k = 1', output: '[1]' },
    ],
    starterCode: { javascript: `function maxSlidingWindow(nums, k) {\n  \n};`, python: `def maxSlidingWindow(nums, k):\n    pass` },
  },
]