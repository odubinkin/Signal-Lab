import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
/**
 * Nest lifecycle wrapper around PrismaClient.
 *
 * The hooks make database connection management explicit when the Nest
 * application starts and shuts down.
 */
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /**
   * Opens the Prisma connection when the Nest module is initialized.
   */
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  /**
   * Closes the Prisma connection when the Nest module is destroyed.
   */
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
