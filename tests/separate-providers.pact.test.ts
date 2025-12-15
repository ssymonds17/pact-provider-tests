import {
  MessageProviderPact,
  providerWithMetadata,
  Verifier,
} from "@pact-foundation/pact"
import * as path from "path"
import express from "express"

import { createContent, createMetadata } from "../provider"

process.env.DSAP = "dv"
process.env.ENV_EXTENSION = undefined

describe("Success Case", () => {
  describe("HTTP Pact Verification", () => {
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

    it("verifies HTTP contracts", () => {
      const verifier = new Verifier({
        provider: "Api",
        logLevel: "info",
        providerBaseUrl: `http://localhost:38793`,
        customProviderHeaders: { "content-type": "application/json" },
        pactUrls: [path.resolve(__dirname, "./pact-contracts/Api-Client.json")],
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

      return verifier.verifyProvider()
    }, 600000)
  })

  describe("Message Pact Verification", () => {
    it("verifies message contracts", () => {
      const messageProvider = new MessageProviderPact({
        logLevel: "info",
        provider: "Api",
        pactUrls: [
          path.resolve(__dirname, "./pact-contracts/Api-Communication.json"),
        ],
        messageProviders: {
          "an order processed event": providerWithMetadata(
            () => createContent(),
            createMetadata()
          ),
        },
        stateHandlers: {
          "an order is processed": async () => Promise.resolve(),
        },
      })

      return messageProvider.verify()
    }, 600000)
  })
})
