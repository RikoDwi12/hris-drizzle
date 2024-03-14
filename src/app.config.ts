import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

const zEnvValidationSchema = z.object({
  APP_PORT: z.number({ coerce: true }).min(1000),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.number({ coerce: true }),
  DB_NAME: z.string()
})

export type IAppConfig = z.infer<typeof zEnvValidationSchema>
export type Env = IAppConfig

@Injectable()
export class AppConfig {
  public env: Env
  constructor(private readonly configService: ConfigService) {
    this.env = new Proxy(({}) as Env, {
      get: (_, prop: keyof IAppConfig) => {
        if (zEnvValidationSchema.keyof()._def.values.includes(prop)) return this.configService.get(prop)
        throw new Error(`Property '${prop}' does not exist in AppConfig.`)
      },
    })
  }

  public static validate(env: unknown) {
    try {
      return zEnvValidationSchema.parse(env)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
