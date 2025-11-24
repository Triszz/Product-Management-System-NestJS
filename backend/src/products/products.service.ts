import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 0, name: 'Tv', quantity: 10, price: 100.0 },
  ];
  maxId(): number {
    let maxId: number = this.products[0].id;
    for (const product of this.products) {
      maxId = Math.max(maxId, product.id);
    }
    return maxId;
  }
  create(createProductDto: CreateProductDto): Product {
    const newProduct = {
      id: this.maxId() + 1,
      ...createProductDto,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    this.products = this.products.map((product) =>
      product.id === id ? { ...product, ...updateProductDto } : product,
    );
    const updatedProduct = this.findOne(id);
    if (!updatedProduct) {
      throw new NotFoundException('Product not found!');
    }
    return updatedProduct;
  }

  remove(id: number): Product {
    const deletedProduct = this.findOne(id);
    if (!deletedProduct) {
      throw new NotFoundException('Product not found!');
    }
    this.products = this.products.filter((product) => product.id !== id);
    return deletedProduct;
  }
}
