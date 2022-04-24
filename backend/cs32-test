#!/usr/bin/env python3

from optparse import OptionParser
import difflib, io, os, subprocess, sys, tempfile, codecs
sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf8', buffering=1)

# color constants
END   = '\033[0m'
HEADER  = '\033[48;5;60m\033[38;5;15m'
TITLE   = '\033[1;30m'
FAIL  = '\033[0;31m'
CRASH   = '\033[1;31m'
SEP   = '\033[0;37m'
PASS  = '\033[0;32m'
GOOD  = '\033[38;5;107m'
BAD   = '\033[38;5;52m'

DIVIDER_WIDTH = 80

# Section tags in the test case
ARGS_TAG = 'ARGS'
INPUT_TAG = 'INPUT'
OUTPUT_TAG = 'OUTPUT'
SECTION_TAGS = [ARGS_TAG, INPUT_TAG, OUTPUT_TAG]
END_TAG = 'END'

# Message prefixes in the program's output
ERROR_PREFIX = 'ERROR:'
IGNORE_PREFIX = 'INFO:'

differ = difflib.Differ()

class TestFormatError(Exception):
  """Raised when a test file contains syntax errors."""
  def __init__(self, message):
    self.message = message


class Test:
  """An individual test case."""
  def __init__(self, executable, filepath, ignore_whitespace=False):
    if not os.path.isfile(executable):
      print('Executable', executable, 'does not exist.')
      sys.exit(1)

    self.executable = executable

    if not os.path.isfile(filepath):
      print('Test ', filepath, 'does not exist.')
      sys.exit(1)

    self.filename = os.path.basename(filepath)
    if self.filename.find('.') >= 0:
      self.name = self.filename[:self.filename.index('.')]

    try:
      sections = self.readtest(filepath, ignore_whitespace)
    except TestFormatError as tfe:
      print('Failed to parse "{0}": {1}'.format(filepath, tfe.message))
      self.valid = False
      return

    self.valid = True
    self.args = sections[ARGS_TAG]
    self.input = sections[INPUT_TAG]
    self.expected = sections[OUTPUT_TAG]

    self.command = self.executable + ' ' + self.args
    if self.executable[-4:] == '.jar':
      self.command = 'java -jar ' + self.command
    self.description = self.command

  @staticmethod
  def readtest(filename, ignore_whitespace=False):
    """Extract the ARGS, INPUT, and OUTPUT sections from a test file.

    Returns a dict with:
      ARGS_TAG -> str
      INPUT_TAG -> list of str
      OUTPUT_TAG -> list of str
    """
    sections = {
        ARGS_TAG: [], 
        INPUT_TAG: [], 
        OUTPUT_TAG: []
    }
    current_section = None

    with open(filename, 'r', encoding = "utf-8") as file:
      lines = [line for line in file.readlines()]

      for idx, line in enumerate(lines):
        if line.startswith(END_TAG):
          current_section = END_TAG
          break
        elif any(line.startswith(tag) for tag in SECTION_TAGS):
          current_section = line.rstrip()
        else:
          sections[current_section].append(line.rstrip('\n') if not ignore_whitespace else line.rstrip())

      if len(sections[ARGS_TAG]) > 1:
        raise TestFormatError('All arguments under the ARGS tag must be on the same line.')
      elif len(sections[ARGS_TAG]) == 1:
        sections[ARGS_TAG] = sections[ARGS_TAG][0]
      else:
        sections[ARGS_TAG] = ""

      if current_section != END_TAG:
        raise TestFormatError('No END tag found. Every test file must contain an END tag.')

    return sections

  # For collapsing consecutive "ERROR: ..." lines down into one line
  @staticmethod
  def collapse_errors(lines):
    collapsed_lines = []
    prev_was_error = False
    for line in lines:
      if not line.startswith("ERROR:"):
        collapsed_lines.append(line)
        prev_was_error = False
      elif line.startswith("ERROR:") and not prev_was_error:
        collapsed_lines.append("ERROR:")
        prev_was_error = True
      else: # Line is an error line, but we already added the previous line as an error
        continue
    return collapsed_lines

  @staticmethod
  def acceptable(expected, actual):
    expected = Test.collapse_errors(expected)
    actual = Test.collapse_errors(actual)
    if len(expected) != len(actual):
      return False
    for expected_line, actual_line in zip(expected, actual):
      if expected_line != actual_line:
        if not expected_line.startswith("ERROR:") or not actual_line.startswith("ERROR:"):
          return False
    return True

  """
  Runs the test. Returns True if passed, False otherwise.

  @param timeout  time limit on waiting for a response from the student
                  executable (in seconds)
  """
  def run(self, timeout, ignore_whitespace):
    print('Running ' + self.name)

    with tempfile.NamedTemporaryFile(mode='w+',encoding="utf-8") as temp:
      with tempfile.NamedTemporaryFile(mode='r+',encoding ="utf-8") as input:
        for line in self.input:
          print(line, file=input)
        input.seek(0)

        try:
          cp = subprocess.call(["sh", "-c", self.command], timeout=timeout,
                            stdin=input, stdout=temp, stderr=subprocess.STDOUT)
        except subprocess.TimeoutExpired:
          print("%s timed out after %f seconds" % (self.name, timeout))
          self.passed = False
          return self.passed
        temp.seek(0)

        actual = []
        for line in temp:
          if not line.startswith(IGNORE_PREFIX):
            actual.append(line.rstrip('\n') if not ignore_whitespace else line.rstrip())

    passed = Test.acceptable(self.expected, actual)
    if not passed:
      # Only diff if the test failed (diff'ing will almost always point out ERROR tags)
      for line in differ.compare(self.expected, actual):
        if line[0:2] != '  ':
          print(line)

    print('Result: ', (PASS + 'Passed' if passed else FAIL + 'Failed'), END)
    print(SEP + ('-' * DIVIDER_WIDTH) + END)

    self.passed = passed
    return self.passed


if __name__ == '__main__':
  parser = OptionParser()
  parser.add_option('-t', '--timeout', dest='timeout',
      help=("The timeout (in seconds) to use when waiting for each test to run."
            " 5 by default."), type='float', default=5.0)
  parser.add_option('-e', '--executable', dest='executable',
      help=("The executable to test. `./run` by default."), 
      type='string', default='./run')
  parser.add_option('-i', '--ignore-whitespace', action='store_true', dest='ignore_whitespace',
      help=("Whether or not to ignore trailing whitespace. False (not ignored) by default."),
      default=False)
  (opts, args) = parser.parse_args()

  if len(args) < 1:
    print('Usage:', sys.argv[0], '<test file> [<test file> ...]')
    print('Run `', sys.argv[0], ' --help` for more options.')
    sys.exit(1)

  executable = opts.executable
  tests = [Test(executable, arg, opts.ignore_whitespace) for arg in args]

  passed = 0
  for test in tests:
    if test.valid:
      test.run(opts.timeout, opts.ignore_whitespace)
      if test.passed:
        passed += 1

  print(END)

  # Print summary
  print(str(passed), '/', str(len(tests)), 'tests passed' + END)

  if passed == len(tests):
    print(PASS + 'TEST SUITE PASSED' + END)
  else:
    print(FAIL + 'TEST SUITE FAILED' + END)
