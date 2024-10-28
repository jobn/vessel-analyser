import z from "zod";

const schema = z.array(
  z.object({
    vessel: z.object({
      imo: z.number(),
      name: z.string(),
    }),
    portCalls: z.array(
      z.object({
        arrival: z.coerce.date(),
        departure: z.coerce.date(),
        isOmitted: z.boolean(),
        port: z.object({
          id: z.string(),
          name: z.string(),
        }),
      })
    ),
  })
);

export type ValidatedRawData = z.infer<typeof schema>;

// biome-ignore lint/suspicious/noExplicitAny: incoming data is not typed
export function validateRawData(rawData: any): ValidatedRawData {
  schema.parse(rawData);
  return rawData;
}
