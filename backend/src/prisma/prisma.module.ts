@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
