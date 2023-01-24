# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
* started by adding the test cases
  * Test cases could be refactored to array of test cases with a for loop over them to execute and compare results
* Refactored the hashing function to be reused in different places and to have params for the algorithm and encoding in case we decided to change it later.
* Added a strategy pattern over the event key candidate to encapsulate the logic as well as allowing further modifications in the future as the event might grow to have other fields and rules.
* Could do the same strategy pattern with the rest of the logic (type enforcement, length) but I believe it would complicate it more so leaving it at that.
### Further improvements
* Add code sonar or something similar
* Add lint rules to enforce format and some rules
* Add CI pipeline to run the tests and allow to merge only when the CI passes