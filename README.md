# Pact Provider Tests

This project demonstrates how to properly structure Pact provider verification tests for both HTTP and Message contracts using the @pact-foundation/pact library.

## Prerequisites

- Node.js (v14 or higher)
- npm

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ssymonds17/pact-provider-tests
cd pact-provider-tests
```

### 2. Install Dependencies

```bash
npm ci
```

This will install all required dependencies including:

- `@pact-foundation/pact` - Pact testing framework
- `jest` and `ts-jest` - Testing framework
- `express` - HTTP server for provider
- `uuid` - UUID generation
- TypeScript type definitions

### 3. Run Tests

```bash
npm test
```

## Test Structure

The project contains three test suites:

### Success Case (`tests/separate-providers.pact.test.ts`)

Demonstrates the correct approach for verifying both HTTP and Message pacts by using:

- `Verifier` class for HTTP contract verification
- `MessageProviderPact` class for Message contract verification

### Failing Case #1 (`tests/verifier-only-with-message-providers.pact.test.ts`)

Demonstrates that using `messageProviders` with the `Verifier` class when mixing HTTP and Message pacts will fail.

### Failing Case #2 (`tests/verifier-only-without-message-providers.pact.test.ts`)

Demonstrates that attempting to verify Message pacts without providing `messageProviders` will fail.

## Project Structure

```
pact-provider-tests/
├── tests/
│   ├── pact-contracts/
│   │   ├── Api-Client.json          # HTTP pact contract
│   │   └── Api-Communication.json   # Message pact contract
│   ├── separate-providers.pact.test.ts
│   ├── verifier-only-with-message-providers.pact.test.ts
│   └── verifier-only-without-message-providers.pact.test.ts
├── provider.ts                      # Provider implementation
├── package.json
└── README.md
```

## Expected Test Results

When running `npm test`, you should see:

- ✅ All 3 test suites pass
- ✅ All 4 tests pass
- The "failing case" tests pass because they correctly expect errors to be thrown

## Key Learnings

1. **Separate Verifiers**: Use separate verifier classes for HTTP and Message contracts
2. **MessageProviderPact**: Use the `MessageProviderPact` class specifically for message contract verification
3. **Sequential Execution**: Tests run sequentially (`--runInBand`) to avoid port conflicts
