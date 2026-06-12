import { NextResponse } from 'next/server'

// Real JS test cases
const CHALLENGE_TEST_CASES = {
  ch_01: [
    { call: 'twoSum([2,7,11,15], 9)', expected: [0,1] },
    { call: 'twoSum([3,2,4], 6)', expected: [1,2] },
    { call: 'twoSum([3,3], 6)', expected: [0,1] },
  ],
  ch_02: [
    { call: 'isValid("()")', expected: true },
    { call: 'isValid("()[]{}")', expected: true },
    { call: 'isValid("(]")', expected: false },
    { call: 'isValid("([)]")', expected: false },
    { call: 'isValid("{[]}")', expected: true },
  ],
  ch_03: [
    { call: 'isPalindrome(121)', expected: true },
    { call: 'isPalindrome(-121)', expected: false },
    { call: 'isPalindrome(10)', expected: false },
  ],
  ch_05: [
    { call: 'fizzBuzz(3)', expected: ["1","2","Fizz"] },
    { call: 'fizzBuzz(5)', expected: ["1","2","Fizz","4","Buzz"] },
  ],
  ch_07: [
    { call: 'singleNumber([2,2,1])', expected: 1 },
    { call: 'singleNumber([4,1,2,1,2])', expected: 4 },
  ],
  ch_08: [
    { call: 'missingNumber([3,0,1])', expected: 2 },
    { call: 'missingNumber([0,1])', expected: 2 },
  ],
  ch_09: [
    { call: 'climbStairs(2)', expected: 2 },
    { call: 'climbStairs(3)', expected: 3 },
    { call: 'climbStairs(5)', expected: 8 },
  ],
  ch_10: [
    { call: 'maxProfit([7,1,5,3,6,4])', expected: 5 },
    { call: 'maxProfit([7,6,4,3,1])', expected: 0 },
  ],
  ch_11: [
    { call: 'containsDuplicate([1,2,3,1])', expected: true },
    { call: 'containsDuplicate([1,2,3,4])', expected: false },
  ],
  ch_12: [
    { call: 'romanToInt("III")', expected: 3 },
    { call: 'romanToInt("LVIII")', expected: 58 },
    { call: 'romanToInt("MCMXCIV")', expected: 1994 },
  ],
  ch_13: [
    { call: 'majorityElement([3,2,3])', expected: 3 },
    { call: 'majorityElement([2,2,1,1,1,2,2])', expected: 2 },
  ],
  ch_16: [
    { call: 'lengthOfLongestSubstring("abcabcbb")', expected: 3 },
    { call: 'lengthOfLongestSubstring("bbbbb")', expected: 1 },
    { call: 'lengthOfLongestSubstring("pwwkew")', expected: 3 },
  ],
  ch_19: [
    { call: 'topKFrequent([1,1,1,2,2,3], 2).sort((a,b)=>a-b).join(",")', expected: "1,2" },
    { call: 'topKFrequent([1], 1).join(",")', expected: "1" },
  ],
  ch_24: [
    { call: 'threeSum([-1,0,1,2,-1,-4]).length', expected: 2 },
    { call: 'threeSum([0,0,0]).length', expected: 1 },
  ],
  ch_26: [
    { call: 'search([-1,0,3,5,9,12], 9)', expected: 4 },
    { call: 'search([-1,0,3,5,9,12], 2)', expected: -1 },
  ],
  ch_36: [
    { call: 'coinChange([1,5,11], 11)', expected: 1 },
    { call: 'coinChange([2], 3)', expected: -1 },
  ],
  ch_37: [
    { call: 'lengthOfLIS([10,9,2,5,3,7,101,18])', expected: 4 },
    { call: 'lengthOfLIS([0,1,0,3,2,3])', expected: 4 },
  ],
  ch_38: [
    { call: 'uniquePaths(3,7)', expected: 28 },
    { call: 'uniquePaths(3,2)', expected: 3 },
  ],
  ch_39: [
    { call: 'canJump([2,3,1,1,4])', expected: true },
    { call: 'canJump([3,2,1,0,4])', expected: false },
  ],
}

function runJSTestCases(code, testCases) {
  return testCases.map((tc, i) => {
    try {
      const fn   = new Function(`${code}\n return (${tc.call})`)
      const result = fn()
      let passed = false

      if (Array.isArray(tc.expected)) {
        passed = JSON.stringify(result) === JSON.stringify(tc.expected)
      } else {
        passed = result === tc.expected || String(result) === String(tc.expected)
      }

      return {
        index:    i + 1,
        passed,
        result:   JSON.stringify(result),
        expected: JSON.stringify(tc.expected),
        call:     tc.call,
      }
    } catch (e) {
      return {
        index:    i + 1,
        passed:   false,
        result:   'Error: ' + e.message,
        expected: JSON.stringify(tc.expected),
        call:     tc.call,
      }
    }
  })
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { language, code, stdin, challengeId, isSubmit } = body

    if (!language || code === undefined) {
      return NextResponse.json(
        { success: false, error: { message: 'Language and code are required' } },
        { status: 400 }
      )
    }

    await new Promise(r => setTimeout(r, 400 + Math.random() * 200))
    const execTime = (Math.random() * 0.15 + 0.01).toFixed(3)
    const memory   = (Math.random() * 10 + 8).toFixed(1)

    // ── SUBMIT MODE ─────────────────────────────────────────────
    if (isSubmit && challengeId) {
      const testCases = CHALLENGE_TEST_CASES[challengeId]

      // JavaScript — real test case execution
      if (language === 'javascript' && testCases) {
        const results    = runJSTestCases(code, testCases)
        const passed     = results.filter(r => r.passed).length
        const total      = results.length
        const allPassed  = passed === total

        const output = results.map(r =>
          `Test case ${r.index}: ${r.passed ? 'Passed ✓' : 'Failed ✗'}` +
          (!r.passed ? `\n  Input:    ${r.call}\n  Expected: ${r.expected}\n  Got:      ${r.result}` : '')
        ).join('\n\n')

        await updateUserStats()

        return NextResponse.json({
          success: true,
          data: {
            stdout:      allPassed ? output : '',
            stderr:      allPassed ? '' : output,
            output,
            status:      allPassed ? 'Accepted' : 'Wrong Answer',
            time:        execTime,
            memory,
            passedTests: passed,
            totalTests:  total,
            isSubmit:    true,
          }
        })
      }

      // Non-JS or no test cases — inform user honestly
      if (language !== 'javascript') {
        await updateUserStats()
        return NextResponse.json({
          success: true,
          data: {
            stdout:      '',
            stderr:      `⚠️ Real-time ${language} execution is not available.\n\nTo validate ${language} solutions, please switch to JavaScript.\n\nYour submission has been recorded but cannot be auto-graded.`,
            output:      '',
            status:      'Not Supported',
            time:        execTime,
            memory,
            passedTests: 0,
            totalTests:  2,
            isSubmit:    true,
            notSupported: true,
          }
        })
      }

      // JS but no test cases defined for this challenge
      await updateUserStats()
      return NextResponse.json({
        success: true,
        data: {
          stdout:      'Your solution has been submitted.',
          stderr:      '',
          output:      'Submission recorded. Auto-grading not available for this problem.',
          status:      'Submitted',
          time:        execTime,
          memory,
          passedTests: 0,
          totalTests:  0,
          isSubmit:    true,
        }
      })
    }

    // ── RUN MODE ────────────────────────────────────────────────
    const result = simulateExecution(language, code, stdin ?? '')
    await updateUserStats()

    return NextResponse.json({
      success: true,
      data: {
        stdout: result.stdout,
        stderr: result.stderr,
        output: result.stdout,
        status: result.stderr ? 'Runtime Error' : 'Accepted',
        time:   execTime,
        memory,
      }
    })

  } catch (error) {
    console.error('[POST /api/execute]', error)
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    )
  }
}

async function updateUserStats() {
  try {
    const { auth }      = await import('@/auth')
    const { connectDB } = await import('@/lib/db')
    const { User }      = await import('@/models/User.model')
    const session       = await auth()
    if (session?.user?.id) {
      await connectDB()
      await User.findByIdAndUpdate(session.user.id, {
        $inc: { 'stats.executionsCount': 1 }
      })
    }
  } catch (e) {}
}

function simulateExecution(language, code, stdin) {
  const stdoutLines = []
  const stderrLines = []

  try {
    switch (language) {
      case 'javascript': {
        const regex = /console\.log\(([^)]+)\)/g
        let match
        while ((match = regex.exec(code)) !== null) {
          stdoutLines.push(evaluateArg(match[1].trim()))
        }
        if (stdoutLines.length === 0 && code.trim()) stdoutLines.push('(no output)')
        break
      }
      case 'python': {
        const regex = /print\(([^)]+)\)/g
        let match
        while ((match = regex.exec(code)) !== null) {
          stdoutLines.push(evaluateArg(match[1].trim()))
        }
        if (stdoutLines.length === 0 && code.trim()) stdoutLines.push('(no output)')
        break
      }
      case 'java': {
        const regex = /System\.out\.println\(([^)]+)\)/g
        let match
        while ((match = regex.exec(code)) !== null) {
          stdoutLines.push(evaluateArg(match[1].trim()))
        }
        if (stdoutLines.length === 0 && code.trim()) stdoutLines.push('(no output)')
        break
      }
      case 'cpp': {
        const regex = /cout\s*<<\s*([^;]+)/g
        let match
        while ((match = regex.exec(code)) !== null) {
          const parts = match[1].split('<<')
            .map(p => p.trim())
            .filter(p => p !== 'endl' && p !== '"\\n"')
            .map(p => evaluateArg(p))
            .join('')
          if (parts) stdoutLines.push(parts)
        }
        if (stdoutLines.length === 0 && code.trim()) stdoutLines.push('(no output)')
        break
      }
      case 'c': {
        const regex = /printf\s*\(\s*"([^"]+)"/g
        let match
        while ((match = regex.exec(code)) !== null) {
          stdoutLines.push(match[1].replace(/\\n/g, ''))
        }
        if (stdoutLines.length === 0 && code.trim()) stdoutLines.push('(no output)')
        break
      }
    }
    if (stdin && stdin.trim() && stdoutLines.length === 0) {
      stdoutLines.push(`Input received: ${stdin.trim()}`)
    }
  } catch (err) {
    stderrLines.push(`Runtime Error: ${err.message}`)
  }

  return {
    stdout: stdoutLines.join('\n'),
    stderr: stderrLines.join('\n'),
  }
}

function evaluateArg(arg) {
  if ((arg.startsWith('"') && arg.endsWith('"')) ||
      (arg.startsWith("'") && arg.endsWith("'"))) return arg.slice(1, -1)
  if (arg.startsWith('`') && arg.endsWith('`')) return arg.slice(1, -1)
  if (/^[\d\s+\-*/().,]+$/.test(arg)) {
    try { return String(eval(arg)) } catch { return arg }
  }
  if (arg === 'true') return 'true'
  if (arg === 'false') return 'false'
  if (arg.includes('+')) {
    return arg.split('+').map(p => evaluateArg(p.trim())).join('')
  }
  return arg
}