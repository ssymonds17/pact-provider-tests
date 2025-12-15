import { v4 as uuidv4 } from "uuid"

export const createContent = () => {
  return new Promise((resolve, reject) => {
    const content = {
      Source: "Api",
      Detail: JSON.stringify(
        {
          data: { id: uuidv4() },
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
  traceId: uuidv4(),
  messageId: uuidv4(),
  timestamp: new Date().toISOString(),
  source: {
    applicationName: "Api",
  },
}
