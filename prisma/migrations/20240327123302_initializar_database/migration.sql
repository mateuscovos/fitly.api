-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Urls" (
    "hash" VARCHAR(6) NOT NULL,
    "redirect_to" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "disabled_at" TIMESTAMP(3),
    "user_id" TEXT,
    "access_counter" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Urls_pkey" PRIMARY KEY ("hash")
);

-- AddForeignKey
ALTER TABLE "Urls" ADD CONSTRAINT "Urls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
