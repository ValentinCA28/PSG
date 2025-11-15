'use client';

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";

export default function EcommercePage() {
  const products = [
    {
      name: "Comfy and stylish t-shirt",
      price: 19.99,
      image: "/placeholder-product.jpg",
      rating: 4.5,
      reviews: 24
    },
    {
      name: "Black sport jacket",
      price: 15.87,
      image: "/placeholder-product.jpg",
      rating: 4.2,
      reviews: 18
    },
    {
      name: "Nike Blazer Men Shoes",
      price: 120.14,
      image: "/placeholder-product.jpg",
      rating: 4.8,
      reviews: 156
    },
    {
      name: "Cotton gray bottom",
      price: 25.00,
      image: "/placeholder-product.jpg",
      rating: 4.0,
      reviews: 32
    },
  ];

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-full">
        <Header />
      <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold">E-commerce</h1>
          <Button className="w-full sm:w-auto">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-square bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted-foreground">Product Image</span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    ({product.reviews})
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reviews Section */}
        <Card>
          <CardHeader>
            <CardTitle>Product Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">John Doe</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Great quality and comfortable fit. Highly recommend!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </ProtectedRoute>
  );
}

