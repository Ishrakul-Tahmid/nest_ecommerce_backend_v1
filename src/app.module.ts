import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/users.entity';
import { Product } from './product/product.entity';
import { Category } from './category/category.entity';
import { Order } from './order/order.entity';
import { OrderItem } from './orderitem/orderitem.entity';
import { Review } from './review/review.entity';
import { Delivery } from './delivery/delivery.entity';
import { Cart } from './cart/cart.entity';
import { CartModule } from './cart/cart.module';
import { DeliveryModule } from './delivery/delivery.module';
import { ReviewModule } from './review/review.module';
import { OrderItemModule } from './orderitem/orderitem.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './user/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'practice',
    entities: [User, Product, Category, Order, OrderItem, Review, Delivery, Cart],
    synchronize: true,
  }),
    UsersModule,
    ProductModule,
    CategoryModule,
    OrderModule,
    OrderItemModule,
    ReviewModule,
    DeliveryModule,
    CartModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
