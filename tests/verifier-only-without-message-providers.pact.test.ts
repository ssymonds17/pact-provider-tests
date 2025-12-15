import { Verifier } from "@pact-foundation/pact"
import * as path from "path"
import express from "express"

process.env.DSAP = "dv"
process.env.ENV_EXTENSION = undefined

describe("Failing Case #2", () => {
  const app = express()
  let server: any

  app.get("/id", (req, res) => {
    res.json({ id: 99999 })
  })

  beforeAll(() => {
    server = app.listen(38793, () => {
      console.log(`Express Server is listening on 38793`)
    })
  })

  afterAll((done) => {
    server.close(done)
  })

  it("fails when both rest and message paths are provided and no messageProviders field is given", async () => {
    const verifier = new Verifier({
      provider: "Api",
      logLevel: "info",
      providerBaseUrl: `http://localhost:38793`,
      customProviderHeaders: { "content-type": "application/json" },
      pactUrls: [
        path.resolve(__dirname, "./pact-contracts/Api-Client.json"),
        path.resolve(__dirname, "./pact-contracts/Api-Communication.json"),
      ],
      stateHandlers: {
        "an id exists": async () =>
          new Promise((resolve, reject) => {
            return resolve({
              status: 200,
              responseBody: {
                id: 99999,
              },
            })
          }),
      },
    })

    await expect(verifier.verifyProvider()).rejects.toThrow()
  }, 600000)
})
