import { v7 as uuidv7 } from "uuid"

export const createContent = () => {
  return new Promise((resolve, reject) => {
    const content = {
      Source: "Api",
      Detail: JSON.stringify(
        {
          data: { id: uuidv7() },
          metadata,
        },
        (_, v) => (typeof v === "bigint" ? parseInt(v.toString()) : v)
      ),
      DetailType: "OrderProcessed",
      EventBusName: "OrdersEventBus",
    }
    resolve(content)
  })
}

export const createMetadata = () => {
  const metadata = { source: "Api", detailType: "OrderProcessed" }
  return metadata
}

const metadata = {
  traceId: uuidv7(),
  messageId: uuidv7(),
  timestamp: new Date().toISOString(),
  source: {
    applicationName: "Api",
  },
}
