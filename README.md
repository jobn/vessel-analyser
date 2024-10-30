  # Port Calls Analytics

  Little script to analyse port calls data and print the output in the console.

  ## Setup

  Install dependencies:

  ```bash
  npm install
  ```

  ## Run

  ```bash
  npm run start
  ```

  ## Tests

  ```bash
  npm run test
  ```


# Excluding the omitted portcalls

Omitted calls should not be included in the call count or duration. However, in the main branch they are.
I have added two different solutions to this problem [here](https://github.com/jobn/vessel-analyser/commit/53226c6492daf3df7fafcdda3f3ed3fd46d9a6df) and [here](https://github.com/jobn/vessel-analyser/commit/5a19f875c2c5c260dbd303e028c02566048d0efa) that differs in where the filtering is done. One filters at the normalisation stage and the other in the analytics stage.
