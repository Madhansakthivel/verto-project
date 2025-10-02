import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsTable1759207359561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE stock_products (
        product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        product_name VARCHAR(255) NOT NULL,
        product_description TEXT,
        stock_quantity INTEGER NOT NULL DEFAULT 0,
        low_stock_threshold INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
    )
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
