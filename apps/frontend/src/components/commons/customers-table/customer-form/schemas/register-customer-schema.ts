import { z } from 'zod'

export const registerCustomerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  socialName: z.string(),
  cpf: z.string().min(11).max(11),
  rgs: z.array(
    z.object({
      value: z.string(),
      issueDate: z.date(),
    }),
  ),
})
